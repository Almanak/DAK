#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import io
import os
import json
import yaml

__author__ = 'Claus Juhl Knudsen'
__version__ = '2016-11-18'

json_file = """/Users/cjk/Dropbox/Projects/DAO/refactored_v2.json"""


def main():

    with io.open(json_file) as inputFile:
        try:
            subjects = json.load(inputFile)
        except ValueError as e:
            print e
            quit()
    inputFile.close()

    # Counters
    subfolder = 1  # Github has a limit on files per folder
    count = 1

    # Filepaths
    # script_dir = os.path.dirname(os.path.abspath(__file__))
    dest_dir = os.path.join('..', '_subjects', str(subfolder))

    for key, values in subjects.items():
        try:
            os.makedirs(dest_dir)
        except:
            pass  # already exists

        filename = key + '.md'

        # yaml.safedump outputs utf8 by default, therefore no explicit encoding
        with io.open(os.path.join(dest_dir, filename), mode='w') as outfile:
            outfile.write(u'---\n')
            outfile.write(u'# Jekyll variables\n')
            outfile.write(u'layout: subject\n')
            outfile.write(u'permalink: /subjects/' + key + '\n\n')
            outfile.write(u'# Specific subject values\n')
            outfile.write(u'uuid: ' + key + '\n')
            yaml.safe_dump(values, outfile, allow_unicode=True, default_flow_style=False)
            outfile.write(u'---')
        outfile.close()
        print key

        if count == 500:
            # When 500 files are written, change subfolder and start over
            subfolder += 1
            dest_dir = os.path.join('..', '_subjects', str(subfolder))
            count = 1
        else:
            count += 1

if __name__ == '__main__':
    main()
