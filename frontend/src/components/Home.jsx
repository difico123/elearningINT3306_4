import React, { Component } from "react";
import styled from "styled-components";
import category from "../service/categoryService"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          name:" abc",
          imageUrl: ""
        }
      ]
    }
  }

  componentDidMount() {
    category.getAll().then((res) => {
      this.setState({data: res.data.categories})
    })
  }

  render() {
    const categories = this.state.data.map((category, index) => {
      return (
        <span key={index}>
            {category.name}
        </span>
      );
    });

    return (
      <Wrap>
      <Categories> {categories}
      </Categories>
    </Wrap>
    )
  }
}



const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 150px;
  padding-top: 10vh;
  padding-left: 10vw;
`;
 