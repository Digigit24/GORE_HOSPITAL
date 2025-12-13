
import os
import glob

# Recursive search for html files
files = glob.glob(r"d:\Gore 9-12-2025\**\*.html", recursive=True)

# Also check specific files if glob misses hidden ones or whatever (but glob is fine)
# Add js files if needed? User mentioned characters, likely in HTML text.

replacements = [
    ("™", "'"),
    ("”", " - "), 
    ("“", " - "),
    ("œ", '"'),
    ("˜", "'"),
    ("¢", "&bull;"), # Bullet point
    # Handle the "" case carefully. 
    # If it is followed by nothing recognizable, it might be a Right Double Quote ( -> \x9d)
    # But python string literal "" might be hard to type if \x9d is invisible.
    # We will rely on context.
    # The user mentioned ",".
]

# We need to handle  if it exists. 
# UTF-8 for ” is \xe2\x80\x9d. 
# In cp1252, \xe2=, \x80=€, \x9d=(undefined). 
# So it often looks like "".
# We will replace "\xe2\x80\x9d" decoded primarily.

for file_path in files:
    try:
        with open(file_path, 'rb') as f:
            raw = f.read()
        
        # We need to detect if it's UTF-8 interpreted as something else or just bad bytes.
        # But if we treat it as binary, we can replace the byte sequences of UTF-8 chars 
        # that are causing issues if the file is being SERVED as something else 
        # or was SAVED as something else.
        
        # Actually, the user sees these characters IN THE EDITOR (I assume). 
        # If I see them in `view_file` (which usually decodes UTF-8), it means the file 
        # actually CONTAINS the bytes for "™" (i.e. c3 a2 e2 82 ac e2 84 a2 ... complex).
        # OR `view_file` is showing me what the user sees because the file IS utf-8 
        # but the content itself was copy-pasted from a broken source?
        
        # Let's check line 1176 of index.html from view_file:
        # "women™s health"
        # If I read this as UTF-8, and I see "™", then the file actually contains the characters:
        #  (U+00E2), € (U+20AC), ™ (U+2122).
        # UTF-8 bytes for that sequence: C3 A2 E2 82 AC E2 84 A2.
        
        # IF the original intended char was ’ (U+2019), bytes E2 80 99.
        # It seems the file has been "double encoded" or "saved as ANSI then read as UTF8 then saved again"?
        # Or simply: The file has `E2 80 99` but the `view_file` tool (or user's editor) 
        # is decoding it as Windows-1252 locally?
        
        # Use python to read as text and replace the mojibake string literals.
        
        content = raw.decode('utf-8') 
        
        new_content = content
        for bad, good in replacements:
            new_content = new_content.replace(bad, good)
            
        # Also specifically handle the right double quote if it appears as  + invisible
        # The char ” is often the culprit.
        if "" in new_content:
             # Check if we have \x9d (if it survived decoding usually \x9d maps to control)
             # or simply replace remaining "" if it looks like a quote?
             pass
             
        if content != new_content:
            print(f"Fixing {file_path}")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
    except Exception as e:
        print(f"Skipping {file_path}: {e}")
