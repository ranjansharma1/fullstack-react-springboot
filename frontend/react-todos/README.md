### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How to convert Javascript to Typescript project

Step 1: Install TypeScript
	• We will first need to download TypeScript to an already created React Project. 
		npm install --save typescript @types/node @types/react @types/react-dom @types/jest
Step 2: Create a tsconfig file 
	• We will need a tsconfig.json file to use with our TypeScript
		npx tsc --init
	• Change in tsconfig.json file
	"jsx": "react-jsx", 
Step3: Change .jx file to .tsx file (if any present)
	• Change the props types and attributes type if required
