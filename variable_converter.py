import os
import glob
import re

#---------------------------------------------------------------------------

def find_files_by_extension (directory, extension):
    # Recursively finds all files in the directory indicated by
    # <directory> that have the extension <extension>.

    return glob.glob(directory + '**' + os.sep + '*.' + extension, recursive = True)

#---------------------------------------------------------------------------

variable_replacements = {
    '{{JS_COPYRIGHT_NOTICE}}': '{{project.js_copyright_notice}}',
    '{{ JS_COPYRIGHT_NOTICE }}': '{{project.js_copyright_notice}}',
    '{{SITE_PATH}}': '{{project.site_path}}',
    '{{ SITE_PATH }}': '{{project.site_path}}',
    '{{VERSION}}': '{{project.version}}',
    '{{ VERSION }}': '{{project.version}}',
}

file_paths = []
file_paths.extend(find_files_by_extension('design/', 'js'))
file_paths.extend(find_files_by_extension('design/', 'css'))
file_paths.extend(find_files_by_extension('design/', 'html'))
file_paths.extend(find_files_by_extension('content/', 'xml'))

for file_path in file_paths:
    print(file_path)
    file_changed = False
    with open(file_path) as file_fh:
        lines = file_fh.readlines()
        newlines = []
        for line in lines:
            newline = line
            for (oldval, newval) in variable_replacements.items():
                newline = newline.replace(oldval, newval)
            newlines.append(newline)
            if newline != line:
                file_changed = True
                print('*** ' + line)
                print('%%% ' + newline)

    if file_changed:
        with open(file_path, 'w') as file_fh:
            file_fh.writelines(newlines)
            
