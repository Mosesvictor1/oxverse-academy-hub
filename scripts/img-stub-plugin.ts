import { plugin } from "bun";

plugin({
  name: "image-stub",
  setup(build) {
    build.onLoad({ filter: /\.(jpg|jpeg|png|svg|webp|gif)$/ }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));
  },
});
