// import React, { useState } from "react";
// import { Form, Input, Label } from "react-bootstrap";

// const InputForm = () => {
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("");
//   const [condition, setCondition] = useState("");
//   const [material, setMaterial] = useState("");
//   const [color, setColor] = useState("");

//   return (
//     <Form>
//       <Label htmlFor="name">Name</Label>
//       <Input
//         id="name"
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Label htmlFor="title">Title</Label>
//       <Input
//         id="title"
//         type="text"
//         placeholder="Enter your title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <Label htmlFor="type">Type</Label>
//       <Input
//         id="type"
//         type="text"
//         placeholder="Enter the type"
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//       />
//       <Label htmlFor="condition">Condition</Label>
//       <Input
//         id="condition"
//         type="text"
//         placeholder="Enter the condition"
//         value={condition}
//         onChange={(e) => setCondition(e.target.value)}
//       />
//       <Label htmlFor="material">Material</Label>
//       <Input
//         id="material"
//         type="text"
//         placeholder="Enter the material"
//         value={material}
//         onChange={(e) => setMaterial(e.target.value)}
//       />
//       <Label htmlFor="color">Color</Label>
//       <Input
//         id="color"
//         type="text"
//         placeholder="Enter the color"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//       />
//     </Form>
//   );
// };

// export default InputForm;
