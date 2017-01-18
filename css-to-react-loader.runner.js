import fs from 'fs';
import vm from 'vm';
import { transform } from 'babel-core';

const content = {
  toString: () => `._3tm50djVeMVyzgKEEuOIbA {
      background-color: #efefef;
  }

  ._1dqMeCxKdQ-mMQo5DSjOyQ {
      padding: 20px;
  }

  ._1wQF7ey2pufkSgu87Ae7jl {
      min-width: 500px;
  }

  ._1oyMM3zpYbCV97styqG2pC {
      border: 4px solid blue;
      display: inline-block;
  }
  
  div {
    color: red;
  }
  
  .Stuff.OtherStuff {
    padding: 10px;
  }
  
  .Block:hover {
    color: blue;
  }

  image._3pYwWnO_i_DZ4oq5aRcdCP, image.Cat {
      background-color: blue;
  }`,
  locals: {
    Block: "_3pYwWnO_i_DZ4oq5akanwy",
    CatImage: "_3pYwWnO_i_DZ4oq5aRcdCP",
    Container: "_3tm50djVeMVyzgKEEuOIbA",
    ImageContainer: "_1oyMM3zpYbCV97styqG2pC",
    h2_Header: "_1dqMeCxKdQ-mMQo5DSjOyQ",
    img_Logo: "_1wQF7ey2pufkSgu87Ae7jl"
  }
};

const sandbox = {
  content,
  require,
  console,
  module: {}
};

const code = transform(
  fs.readFileSync('./css-to-react-loader.dev.js'),
  {
    presets: ["es2015", "react"],
    plugins: ["transform-object-rest-spread"]
  }
).code;


const context = vm.createContext(sandbox);
const script = new vm.Script(
  code
);
script.runInNewContext(context);

console.log(sandbox.module.exports.locals);
