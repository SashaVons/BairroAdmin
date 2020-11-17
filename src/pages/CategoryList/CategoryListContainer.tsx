import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  fetchAllCategories,
  fetchDeleteCategory,
} from "../../redux/categories/actions";
import { Link, useRouteMatch } from "react-router-dom";
import { RootState } from "../../redux/RootReducer";
import Icon from "@material-ui/core/Icon";

import "./category-list.scss";
import { AcceptDialog } from "../../components/AcceptDialog/AcceptDialog";

interface CategoryListProps {
  categories: any;
  fetchAllCategories: () => void;
  fetchDeleteCategory: (categoryId: string) => void;
}

const CategoryListContainer: FC<CategoryListProps> = ({
  categories,
  fetchAllCategories,
  fetchDeleteCategory,
}) => {
  const match = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <AcceptDialog
        title="Do you want delete this category?"
        show={open}
        actionOnSuccess={() =>
          fetchDeleteCategory(categories[categoryIndex]._id)
        }
        setShow={setOpen}
      />
      <div className="Category">
        <div className="Category-Header">
          <div className="Category-Header-Button"></div>
          <p className="Category-Header-Title">Category</p>
          <Link className="Category-Header-Button" to={`${match.url}/create`}>
            <Icon className="Category-Header-Button-Icon">
              add_circle_outline
            </Icon>
          </Link>
        </div>
        <table className="Category-Table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories
              ? categories.map((item: any, index: number) => (
                  <>
                    <tr>
                      <td align="left">
                        <img
                          src={item.image}
                          className="Category-Table-Image"
                        />
                      </td>
                      <td className="Category-Table-Title" align="left">
                        {item.name}
                      </td>
                      <td align="right">
                        {/* /edit/:categoryId */}
                        <Link to={`${match.url}/edit/${item._id}`}>
                          <Icon className="Category-Table-Edit">edit</Icon>
                        </Link>
                        <div
                          onClick={() => {
                            setCategoryIndex(index);
                            setOpen(true);
                          }}
                        >
                          <Icon className="Category-Table-Delete">delete</Icon>
                        </div>
                      </td>
                    </tr>
                  </>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchDeleteCategory: (categoryId: string) =>
    dispatch(fetchDeleteCategory(categoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListContainer);
