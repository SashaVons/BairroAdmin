import styled from "styled-components";

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: calc(100vh - 60px);
  width: 100%;
  z-index: 2;
  text-align: left;
  position: fixed;
  margin-top: 60px;
  border-top: #e4e4e4 solid 1px;
  transition: transform 0.3s ease-in-out;

  a {
    padding: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #c700cb;
    text-decoration: none;
    transition: color 0.3s linear;
    font-size: 1.5rem;
    text-align: center;

    &:hover {
      color: #343078;
    }
  }
`;
