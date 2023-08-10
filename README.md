# vue-visualjson

Vue-visualjson is a Vue 3 component that provides a canvas to visualize and interact with JSON data in a graphical tree-diagram. Incorporate and customize the component directly in your Vue app with its dynamic size and formatting options.

_Note: This is the first public release of the component and I've tried to pull it together in a short time frame, so I expect there will be some bugs, compatibility issues and oddities. Please let me know if you encounter anything and I'll work to get a fix in._

## Features

### Responsive canvas view to inspect JSON data.

Easily navigate the viewport by panning and zooming. Press the home button at any time to reset the viewport.


https://github.com/c-colombo/vue-visualjson/assets/129905607/9f08fe29-c6e1-4326-b127-f103969c4484


### Precision edges provide a clear view of JSON data structure.

Edges line up precisely with their parent key-value pair, providing an unambiguous representation of the JSON data hierarchy.


https://github.com/c-colombo/vue-visualjson/assets/129905607/6307e37a-7961-49d3-a9ee-9c419820bcf9


### View arrays in collapsed or expanded mode.

Collapse arrays for a compact view that allows you to cycle through them entry-by-entry, or de-select to see all entries in a full expanded view.


https://github.com/c-colombo/vue-visualjson/assets/129905607/ac45d21b-d876-46ef-91b3-44a3fc038d86


### Color-coding for nodes and edges.

Optionally enable color-coding to gain insight into the structure of JSON data:

- **Nodes:** Object nodes are blue, and array nodes are yellow (array nodes appear for JSON data with multi-dimensional arrays).
- **Edges:** Blue edges indicate the child node is the exclusive value in the parent key-value pair, while yellow edges indicate it is an array-entry.


https://github.com/c-colombo/vue-visualjson/assets/129905607/fdeece50-1be9-4a22-9d70-1ec05bf81406


### Value color-coding and labels.

Values are color-coded by type, aligning with commonly-used colors for literals in code-editor themes. Optionally enable type-labels for an even clearer view.


https://github.com/c-colombo/vue-visualjson/assets/129905607/e239fcf0-1d16-4b47-9438-d3a9e8814348


### Customizable rendering options.

Easily change rendering parameters in the included control panel. Override default parameters by passing a prop to VisualJSON in your code.


https://github.com/c-colombo/vue-visualjson/assets/129905607/92d3c5c9-0408-4938-95c0-79b6bb83e63b


## Dependencies

Vue-visualjson is fairly lightweight and implements most of its functionality directly. The only two dependencies are:

- [Denque - Provides a double-ended queue with constant-time operations, used when building tree-data.](https://github.com/invertase/denque)
- [Vue Phosphor Icons - Used for UI icons where needed.](https://github.com/phosphor-icons/vue)

## Getting Started

### npm (for use in your Vue app)

1. Add the package to your project with npm install.

   ```
   npm install vue-visualjson
   ```

2. In your Vue application main file:

   - Import the component and its .css style sheet.
   - Install the component globally with app.use()

   _example main.ts/main.js file:_

   ```
   import { createApp } from 'vue'
   import App from './App.vue'
   import VisualJSON from 'vue-visualjson'
   import 'vue-visualjson/style.css'

   const app = createApp(App)
   app.use(VisualJSON)
   app.mount('#app')
   ```

3. Instance the VisualJSON component in a .vue file template and pass it json data via props (see below for component prop information).

   _Note: VisualJSON has a minimum width/height of 640px/480px, but does not have a fixed size and hence will follow your template or custom style settings._

   ```
   <VisualJSON :json="yourJsonData"/>
   ```

## Sample App

A sample Vue app making use of the component is provided in this repo. To use it, simply clone the repo, perform an npm install, and run the script `npm run dev:sample`.

## Formatting

The formatting object contains the following properties. If you are providing an object as the defaultFormatting prop, ensure the object follows this structure and contains sensible values (I haven't tested it with nonsensical values, but I expect things could look real wacky!). **All numeric values are interpreted as rem units.**

| Property              | Type    | Description                                                             | Default Value |
| --------------------- | ------- | ----------------------------------------------------------------------- | ------------- |
| collapseArrays        | boolean | Controls whether arrays are collapsed or expanded.                      | true          |
| colorcodeEdges        | boolean | Controls whether edges are rendered with color-coding or default color. | false         |
| colorcodeNodes        | boolean | Controls whether nodes are rendered with color-coding or default color. | false         |
| typeLabels            | boolean | Controls whether type labels are displayed next to property key.        | false         |
| textSize              | number  | Text size used in nodes for keys/values (rem).                          | 0.75          |
| lineSpacing           | number  | Line spacing used in nodes (rem).                                       | 0.25          |
| nodePaddingVertical   | number  | Vertical padding within nodes (rem).                                    | 0.5           |
| nodePaddingHorizontal | number  | Horizontal padding within nodes (rem).                                  | 0.5           |
| nodeWidth             | number  | Width of nodes (rem).                                                   | 24            |
| nodeSpacingVertical   | number  | Vertical spacing between nodes in the same tier (rem).                  | 4             |
| tierSpacingHorizontal | number  | Spacing between tiers (rem).                                            | 6             |

## Component Props

Currently the component has only two props:

- **json** (string) _required_ - Stringified JSON data (can be generated by using JSON.stringify() on an object). **This is all you need!**

  _Note: String must be valid stringified JSON data that can be parsed with JSON.parse(), otherwise no diagram will be displayed._

- **defaultFormatting** (object) _optional_ - Pass prop to customize the default formatting options the component mounts with (see below formatting options and object structure).

## Further Developments

If this proves useful I have some ideas for further features and developments including:

- Updated array index/length UI (possibly make it an input and zero-indexed).
- Node click/hover actions.
- Prop for disabling control panel.
- Light/dark theme selection with system preference detection.
- Minimap
- Tier-specific formatting
- Vertical layout mode.
- React version (if there is interest).

## Feedback and Suggestions

This is both the first generic Vue component I have published, and my first public Github project. Putting this together has been a great learning opportunity for me and I'm sure many improvements could be made to the code. If you have any feedback or suggestions for me please let me know - I'd love to hear them!
