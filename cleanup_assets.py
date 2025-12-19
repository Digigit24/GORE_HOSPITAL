
import os
import re
import shutil

# 1. Define paths
PROJECT_ROOT = r"d:\Gore 9-12-2025"
ASSETS_DIR = os.path.join(PROJECT_ROOT, "assets")

# 2. Extensions to look for
IMG_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.mp4'}

# 3. Collect all referenced files
referenced_files = set()

# Regex to find quoted filenames, like "foo.png" or 'bar.jpg' or url(baz.svg)
# This is a heuristic. It finds simple filenames. 
# It might miss dynamic JS references (e.g. "image-" + id + ".jpg"), but standard unused cleaning usually accepts that risk or requires manual review.
pattern = re.compile(r'[\"\']?([a-zA-Z0-9_\-\.\/]+\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4))[\"\']?', re.IGNORECASE)

print("Scanning for file references...")

for root, dirs, files in os.walk(PROJECT_ROOT):
    for valid_file in files:
        if valid_file.endswith(('.html', '.css', '.js', '.py')): # Scanning code files
            file_path = os.path.join(root, valid_file)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    matches = pattern.findall(content)
                    for match in matches:
                        # Clean up path separators and get just the filename
                        # Many refs are like "assets/img.png" or "../assets/img.png"
                        # We are interested in the BASENAME mainly if we assume flat structure, 
                        # but assets often has subfolders.
                        
                        # Let's verify against full relative path match OR just filename match.
                        # Simplest robust approach for "assets" cleanup:
                        # If the string contains the filename, we count it as referenced.
                        
                        basename = os.path.basename(match)
                        referenced_files.add(basename.lower())
            except Exception as e:
                print(f"Error reading {file_path}: {e}")

print(f"Found {len(referenced_files)} unique referenced identifiers.")

# 4. Scan assets folder for actual files
assets_files = []
for root, dirs, files in os.walk(ASSETS_DIR):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in IMG_EXTENSIONS:
            full_path = os.path.join(root, f)
            assets_files.append(full_path)

print(f"Found {len(assets_files)} files in assets folder.")

# 5. Determine unused
unused_files = []
for f_path in assets_files:
    f_name = os.path.basename(f_path).lower()
    
    # Check if filename exists in references
    # (Checking strictly by basename matches most cases, but risks false positives if two files share a name in diff folders. 
    #  Project seems to have flat or semi-flat assets. We'll stick to basename matching which is conservative SAFE (keeps duplicates if one is used) 
    #  Wait, basename matching is UNSAFE for deletion if we delete *all* matching basenames. 
    #  But here we are checking if the file on disk is referenced. 
    #  If 'logo.png' is in refs, we keep 'assets/logo.png' AND 'assets/subdir/logo.png'. 
    #  So basename matching = conservative keep = safe against accidental deletion.)
    
    if f_name not in referenced_files:
        unused_files.append(f_path)

# 6. Delete (or move)
print(f"Found {len(unused_files)} unused files.")
count = 0
for f in unused_files:
    try:
        os.remove(f)
        print(f"Deleted: {f}")
        count += 1
    except OSError as e:
        print(f"Error deleting {f}: {e}")

print(f"Total deleted: {count}")
