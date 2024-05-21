import React from "react";
import "./test.css";

const Test = () => {
  return (
    <div className="test_page">
      <h1>TITLE</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ex, a
        cum eos itaque nemo tenetur, veritatis, perspiciatis sint ad possimus
        numquam laboriosam recusandae non illum ratione repellat? Laboriosam,
        neque.
      </p>
      <h1>TITLE</h1>
      <p className="second_paragraph">
        Lorem ipsum dolor <span>sit</span>, amet consectetur adipisicing{" "}
        <span>elit</span>. Expedita hic maiores sint alias laborum mollitia
        laboriosam harum iste esse repudiandae animi doloremque reiciendis
        molestias, totam, eos quo? Error, obcaecati fuga!
      </p>
    </div>
  );
};

export default Test;
