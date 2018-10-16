import os
from zipfile import ZipFile

ASSIGNMENT_DIR = './assignment/'
EXTRACT_DIR = './extracted/'

def extract_student_name(filename: str):
    try:
        first_index = filename.index('-', filename.index('-') + 1)
        last_index = filename.index('-', first_index + 1)
        name = filename[first_index + 1:last_index].strip()
        return name
    except:
        return filename

def unzip(filename, destination):
    with ZipFile(ASSIGNMENT_DIR + filename, 'r') as zf:
        zf.extractall(EXTRACT_DIR + destination)

if __name__ == '__main__':
    zip_list = sorted([x for x in os.listdir('./assignment') if x.endswith('.zip')])
    zip_list.append('')
    num_student = 0
    for file_a, file_b in zip(zip_list, zip_list[1:]):
        name_a = extract_student_name(file_a)
        name_b = extract_student_name(file_b)
        if name_a != name_b:
            unzip(file_a, name_a)
            num_student += 1

    print('total student : %d' % num_student)