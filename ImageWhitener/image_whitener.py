from PIL import Image
import os

def convert_images_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith((".png", ".jpg", ".jpeg")):
                image_path = os.path.join(root, filename)
                img = Image.open(image_path)
                width, height = img.size
                white_img = Image.new("RGB", (width, height), "white")
                print(f"Convirtiendo {image_path} a blanco...")
                white_img.save(image_path)
                print(f"{image_path} convertido a blanco.")

def main():
    folder_path = input("Ingrese la ruta de la carpeta con las imágenes: ")
    
    if not os.path.exists(folder_path):
        print("La carpeta no existe.")
        return
    
    convert_images_in_folder(folder_path)
    
    print("Proceso completado.")

if __name__ == "__main__":
    main()
