FBImagesCollection = new FS.Collection("fbImages", {
  stores: [new FS.Store.FileSystem("fbImages", {path: "E:/myProjs/github-meteorialize/trunk/public/images/internal/fb"})]
});