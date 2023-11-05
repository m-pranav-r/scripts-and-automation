from PIL import Image
import glob

image_list = []
for filename in sorted(glob.glob('C:/Users/Pranav/Documents/Misc/MASTER BOOKS/MG1MG2/Texture2D/cropped/*.png'), key = len):
    im = Image.open(filename)
    im_resized = im.resize((761*2, 1080*2))
    image_list.append(im_resized)

image_list[0].save(
    'C:/Users/Pranav/Documents/Misc/MASTER BOOKS/MG1MG2/Texture2D/cropped/MG12MASTERBOOK-NATIVE.pdf', "PDF" ,resolution=100.0, save_all=True, append_images=image_list[1:]
)

image_list = []
for filename in sorted(glob.glob('C:/Users/Pranav/Documents/Misc/MASTER BOOKS/MG1MG2/Texture2D/cropped/*.png'), key = len):
    im = Image.open(filename)
    im_resized = im.resize((761, 1080))
    image_list.append(im_resized)

image_list[0].save(
    'C:/Users/Pranav/Documents/Misc/MASTER BOOKS/MG1MG2/Texture2D/cropped/MG12MASTERBOOK-1080P.pdf', "PDF" ,resolution=50.0, save_all=True, append_images=image_list[1:]
)
