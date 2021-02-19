import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link, useRouteMatch } from "react-router-dom";
import { RootState } from "../../redux/RootReducer";
import Icon from "@material-ui/core/Icon";
import "./products-list.scss";
import { AcceptDialog } from "../../components/AcceptDialog/AcceptDialog";
import {
  fetchAllProducts,
  fetchDeleteProduct,
} from "../../redux/products/actions";

interface ProductsListProps {
  products: any;
  fetchAllProducts: () => void;
  fetchDeleteProduct: (productId: string) => void;
}

const ProductsListContainer: FC<ProductsListProps> = ({
  products,
  fetchAllProducts,
  fetchDeleteProduct,
}) => {
  const match = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <AcceptDialog
        title="Do you want delete this product?"
        show={open}
        actionOnSuccess={() => fetchDeleteProduct(products[productIndex]._id)}
        setShow={setOpen}
      />
      <div className="Products">
        <div className="Products-Header">
          <div className="Products-Header-Button"></div>
          <p className="Products-Header-Title">Products</p>
          <Link className="Products-Header-Button" to={`${match.url}/create`}>
            <Icon className="Products-Header-Button-Icon">
              add_circle_outline
            </Icon>
          </Link>
        </div>
        <table className="Products-Table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Storage Count</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Storage Info</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products
              ? products.map((item: any, index: number) => (
                  <>
                    <tr>
                      <td align="left">
                        <img
                          src={item.images[0]}
                          className="Products-Table-Image"
                        />
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {item.title}
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {item.storage_count}
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {item.category.name}
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {item.sub_category.map(
                          (subCategory: any, index: number) =>
                            `${subCategory.name}${
                              item.sub_category.length !== index + 1 ? ", " : ""
                            }`
                        )}
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {item.storage_info}
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {`${item.price.current} €`}
                      </td>
                      <td className="Products-Table-Title" align="left">
                        {`${item.price.discount}%`}
                      </td>
                      <td align="right">
                        {/* /edit/:categoryId */}
                        <Link to={`${match.url}/edit/${item._id}`}>
                          <Icon className="Products-Table-Edit">edit</Icon>
                        </Link>
                        <div
                          onClick={() => {
                            setProductIndex(index);
                            setOpen(true);
                          }}
                        >
                          <Icon className="Products-Table-Delete">delete</Icon>
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
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  fetchDeleteProduct: (productId: string) =>
    dispatch(fetchDeleteProduct(productId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListContainer);
