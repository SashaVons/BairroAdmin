import React, { FC } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { PermissionsRoute } from "../../common/routes/PrivateRoute";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import { RootState } from "../../redux/RootReducer";
import "./cabinet.scss";

const CategoryList = React.lazy(
  () => import("../CategoryList/CategoryListContainer")
);

const CreateCategory = React.lazy(
  () => import("../CreateCategory/CreateCategoryContainer")
);

const EditCategory = React.lazy(
  () => import("../EditCategory/EditCategoryContainer")
);

const SubCategoryList = React.lazy(
  () => import("../SubCategoryList/SubCategoryListContainer")
);

const CreateSubCategory = React.lazy(
  () => import("../CreateSubCategory/CreateSubCategoryContainer")
);

const EditSubCategory = React.lazy(
  () => import("../EditSubCategory/EditSubCategoryContainer")
);

const ProductsList = React.lazy(
  () => import("../ProductsList/ProductsListContainer")
);

const PromocodesList = React.lazy(
  () => import("../PromocodesList/PromocodesListContainer")
);

const CreateProduct = React.lazy(
  () => import("../CreateProduct/CreateProductContainer")
);

const EditProduct = React.lazy(
  () => import("../EditProduct/EditProductContainer")
);

const CreatePromocode = React.lazy(
  () => import("../CreatePromocode/CreatePromocodeContainer")
);

const EditPromocode = React.lazy(
  () => import("../EditPromocode/EditPromocodeContainer")
);

const OrdersList = React.lazy(
  () => import("../OrdersList/OrdersListContainer")
);

const OrderItem = React.lazy(() => import("../OrderItem/OrderItemContainet"));

interface CabinetProps {
  user: any;
}

const CabinetContainer: FC<CabinetProps> = ({ user }) => {
  return (
    <section className="Cabinet">
      <LeftMenu />
      <section role="main" className="Cabinter-Content">
        <Switch>
          <PermissionsRoute
            path="/cabinet/categories/edit/:categoryId"
            component={EditCategory}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/categories/create"
            component={CreateCategory}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/categories"
            component={CategoryList}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/sub_categories/edit/:subCategoryId"
            component={EditSubCategory}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/sub_categories/create"
            component={CreateSubCategory}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/sub_categories"
            component={SubCategoryList}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/products/edit/:productId"
            component={EditProduct}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/products/create"
            component={CreateProduct}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/products"
            component={ProductsList}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/promocodes/edit/:promocodeId"
            component={EditPromocode}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/promocodes/create"
            component={CreatePromocode}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/promocodes"
            component={PromocodesList}
            access={user.type === "admin"}
          />
          <PermissionsRoute
            path="/cabinet/orders/:orderId"
            component={OrderItem}
            access={user.type === "admin" || user.type === "dispatcher"}
          />
          <PermissionsRoute
            path="/cabinet/orders"
            component={OrdersList}
            access={user.type === "admin" || user.type === "dispatcher"}
          />
        </Switch>
      </section>
    </section>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {})(CabinetContainer);
