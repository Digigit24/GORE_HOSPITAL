
import os
import glob

files = glob.glob(r"d:\Gore 9-12-2025\**\*.html", recursive=True)

# Extended replacements
replacements = [
    ("™", "'"),
    ("”", " - "), 
    ("“", " - "),
    ("œ", '"'),
    ("˜", "'"),
    ("¢", "&bull;"), 
    ("©", "&copy;"),
    ("®", "&reg;"),
]

# Note about  (nbsp):
# Unicode Non-breaking space is \xa0. 
# UTF-8: \xc2\xa0.
# CP1252: \xc2 = , \xa0 = (nbsp).
# So it shows as " ".
# String literal for that in python source code needs care. 
# We'll detect it by bytes or unicode string "\xc2\xa0" if decoded as cp1252?
# But we are reading as utf-8 (hopefully).
# If the file IS utf-8, python reads it as \xa0 (one char).
# If the user SEES " ", it means the editor is reading as cp1252.
# BUT, if I am "replacing characters", I am editing the file content.
# If I change \xc2\xa0 to something else, I'm modifying the Utf-8 content.
# But wait, if the file IS VALID UTF-8, why does the user see " "?
# Because their browser or editor is set to Windows-1252 or ANSI.
# If I change it to `&nbsp;`, it is ASCII safe and works in both.

# So I will replace \xa0 (unicode char) with `&nbsp;` ? 
# Or if the file is double encoded?
# index.html in view_file showed: `©`.
# `view_file` usually handles utf-8 fine.
# If `view_file` shows `©`, then the file content is `C3 82 C2 A9` (Double encoded!) ??
# UTF-8 for `©` is `C2 A9`.
# If `view_file` decodes that as UTF-8, it gets `©`.
# IF `view_file` shows `©`, it means the file contains `` (C3 82) and `©` (C2 A9) ???
# `` is `C3 82` in UTF-8. `©` is `C2 A9` in UTF-8.
# Maybe the file has `C3 82 C2 A9`.
# `C3 82` -> ``. `C2 A9` -> `©`.
# So `©` in UTF-8 is `C3 82 C2 A9`.

# IF the file was saved as UTF-8 *interpreted as 1252* and then SAVED AS UTF-8 again.
# Original: `©` (C2 A9).
# Editor reads C2 as , A9 as ©. Shows "©".
# User saves "©" as UTF-8.
# "" -> C3 82. "©" -> C2 A9.
# Resulting file: C3 82 C2 A9.

# If this is the case, identifying the strings `©`, `™` etc in UTF-8 content is correct.
# And ` ` (nbsp) would be `C3 82 C2 A0`.

# So I should search for the string " " (A-circumflex + nbsp) if it exists.
# Or " " (A-circumflex + space).

replacements.append((" ", " ")) # Replace " " with space.

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for bad, good in replacements:
            new_content = new_content.replace(bad, good)
            
        # Handle the NBSP case specifically if it's appearing as \u00c2\u00a0
        # \u00c2 is .
        
        if content != new_content:
            print(f"Fixing {file_path}")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
    except Exception as e:
        print(f"Skipping {file_path}: {e}")
