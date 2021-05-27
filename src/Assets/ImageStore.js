const IMAGE_FOLDER_PATH = "Images/";

class ImageStore {
  loadImages(p5) {
    this.images = [];
    this.images.push({
      image: p5.loadImage(
        `${IMAGE_FOLDER_PATH}Tokens/Halloween_hero_cleric.png`
      ),
      name: "Cleric"
    });
    console.log(`Loaded ${this.images[0].image}`);
  }

  getImage(name) {
    for (let imageIndex in this.images) {
      const image = this.images[imageIndex];

      if (image.name === name) {
        return image;
      }
    }
    console.log(`Failed to load image named ${name}`);
  }
}
let imageStore = new ImageStore();
export default imageStore;
