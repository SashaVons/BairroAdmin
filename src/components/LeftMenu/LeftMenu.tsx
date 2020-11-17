import React, { FC, useState } from "react";
import { useLocation, Link, useRouteMatch } from "react-router-dom";
// import { Icon } from "../../common/Icon/Icon";
import { StyledBurger } from "./Burger.styled";
import { StyledMenu } from "./Menu.styled";
import logo from "../../assets/img/logo_b.png";
import "./menu.scss";
import { connect } from "react-redux";
import { RootState } from "../../redux/RootReducer";
import Icon from "@material-ui/core/Icon";
import { Dispatch } from "redux";
import { userLogout } from "../../redux/user/actions";

interface LeftMenuProps {
  user: any;
  userLogout: () => void;
}

const LeftMenu: FC<LeftMenuProps> = ({ user, userLogout }) => {
  const [open, setOpen] = useState(false);
  const match = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <div className="Menu">
        <div className="Menu-List">
          <img src={logo} className="Menu-List-Image" />
          <div className="Menu-List-Underline"></div>
          {user.type === "admin" ? (
            <Link
              to={`${match.url}/categories`}
              className={`Menu-List-Item ${
                location.pathname.includes(`${match.url}/categories`)
                  ? "Menu-List-Selected"
                  : ""
              }`}
            >
              <a className="Menu-List-Item-Link">Category</a>
            </Link>
          ) : null}
          {user.type === "admin" ? (
            <Link
              to={`${match.url}/sub_categories`}
              className={`Menu-List-Item ${
                location.pathname.includes(`${match.url}/sub_categories`)
                  ? "Menu-List-Selected"
                  : ""
              }`}
            >
              <a className="Menu-List-Item-Link">Sub Category</a>
            </Link>
          ) : null}
          {user.type === "admin" ? (
            <Link
              to={`${match.url}/products`}
              className={`Menu-List-Item ${
                location.pathname.includes(`${match.url}/products`)
                  ? "Menu-List-Selected"
                  : ""
              }`}
            >
              <a className="Menu-List-Item-Link">Products</a>
            </Link>
          ) : null}
          {user.type === "admin" || user.type === "dispatcher" ? (
            <Link
              to={`${match.url}/orders`}
              className={`Menu-List-Item ${
                location.pathname.includes(`${match.url}/orders`)
                  ? "Menu-List-Selected"
                  : ""
              }`}
            >
              <a className="Menu-List-Item-Link">Orders</a>
            </Link>
          ) : null}
          {user.type === "admin" ? (
            <Link
              to={`${match.url}/promocodes`}
              className={`Menu-List-Item ${
                location.pathname.includes(`${match.url}/promocodes`)
                  ? "Menu-List-Selected"
                  : ""
              }`}
            >
              <a className="Menu-List-Item-Link">Promocodes</a>
            </Link>
          ) : null}
          <div className="Menu-List-Underline"></div>
          <div className="Menu-List-Logout" onClick={() => userLogout()}>
            <Icon className="Menu-List-Logout-Icon">login</Icon>
          </div>
        </div>
      </div>
      <div className="Burger">
        <div className="Burger-Container">
          <div className="Burger-Container-Button">
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
              <div />
              <div />
              <div />
            </StyledBurger>
          </div>
          {/* <img
            src={require("../../assets/img/logos/logo.png")}
            className="Burger-Container-Image"
          /> */}
          <div className="Burger-Container-Button"></div>
        </div>
        <StyledMenu open={open}>
          <Link
            onClick={() => setOpen(false)}
            to={`${match.url}/categories`}
            className="Menu-List-Item"
          >
            <a>Category</a>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={`${match.url}/sub_categories`}
            className="Menu-List-Item"
          >
            <a>Sub Category</a>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={`${match.url}/products`}
            className="Menu-List-Item"
          >
            <a>Products</a>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={`${match.url}/orders`}
            className="Menu-List-Item"
          >
            <a>Orders</a>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to={`${match.url}/promocodes`}
            className="Menu-List-Item"
          >
            <a>Promocodes</a>
          </Link>
        </StyledMenu>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
