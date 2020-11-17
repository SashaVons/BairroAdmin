import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./edit-product.scss";
import {
  fetchAllCategories,
  fetchCreateCategory,
} from "../../redux/categories/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FormSelect } from "../../components/FormSelect/FormSelect";
import { fetchAllSubCategories } from "../../redux/sub_categories/actions";
import {
  fetchCreateProduct,
  fetchSingleProduct,
  fetchUpdateProduct,
} from "../../redux/products/actions";
import { Product } from "../../common/types/Types";
import { firestore } from "../../common/firebase";

type UpdateProduct = {
  title: string;
  price: number;
  discount: number;
  category: string;
  sub_categories: string;
  descriptions: string;
  life_conditions: string;
  сomposition: string;
};

interface EditProductProps {
  fetchCreatePhoto: (image: any) => void;
  fetchAllCategories: () => void;
  fetchAllSubCategories: () => void;
  fetchSingleProduct: (productId: string) => void;
  fetchUpdateProduct: (
    updated_product: Product,
    productId: string,
    history: any
  ) => void;
  singleProduct: any;
  last_photo: string | undefined;
  categories: any;
  sub_categories: any;
  subCategoriesLoading: boolean;
  categoriesLoading: boolean;
}

const EditProductContainer: FC<EditProductProps> = ({
  fetchCreatePhoto,
  fetchSingleProduct,
  fetchAllSubCategories,
  fetchAllCategories,
  fetchUpdateProduct,
  last_photo,
  categories,
  sub_categories,
  subCategoriesLoading,
  categoriesLoading,
  singleProduct,
}) => {
  const match = useRouteMatch<any>();
  const { productId } = match.params;
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    fetchSingleProduct(productId);
    fetchAllSubCategories();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (singleProduct) {
      setValue("title", singleProduct.title);
      setValue("price", singleProduct.price.current);
      setPrice(singleProduct.price.current);
      setValue("discount", singleProduct.price.discount);
      setDiscount(singleProduct.price.discount);
      setValue("category", singleProduct.category._id);
      setCategory(singleProduct.category._id);
      setValue("sub_categories", singleProduct.sub_category._id);
      setValue("descriptions", singleProduct.descriptions);
      setValue("life_conditions", singleProduct.life_conditions);
      setValue("сomposition", singleProduct.сomposition);
    }
  }, [singleProduct]);

  const handleImageAsFile = async (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    await fetchCreatePhoto(image);
    setPhotoLoad(true);
  };
  const onSubmit = (data: UpdateProduct) => {
    fetchUpdateProduct(
      {
        title: data.title,
        price: {
          current: data.price,
          discount: data.discount,
        },
        descriptions: data.descriptions,
        images: [
          isPhotoLoad && last_photo ? last_photo : singleProduct.images[0],
        ],
        category: firestore.doc(`category/${data.category}`),
        sub_category: firestore.doc(`sub_category/${data.sub_categories}`),
        life_conditions: data.life_conditions,
        сomposition: data.сomposition,
      },
      productId,
      history
    );
  };

  return (
    <div className="Product-Edit">
      <div className="Product-Edit-Header">
        <p className="Product-Edit-Header-Title">Creat Category</p>
        <div className="Product-Edit-Header-Button"></div>
      </div>
      {sub_categories && categories ? (
        <form className="Product-Edit-Form" onSubmit={handleSubmit(onSubmit)}>
          {isPhotoLoad ? (
            <img
              className="Product-Edit-Form-Selected-Image"
              src={last_photo}
            />
          ) : singleProduct ? (
            <img
              className="Product-Edit-Form-Selected-Image"
              src={singleProduct.images[0]}
            />
          ) : (
            <div className="Product-Edit-Form-Image-Empty">
              <p>Image not added</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="Product-Edit-Form-Image"
            onChange={handleImageAsFile}
          />
          <FormInput
            placeholder={"Title"}
            name={"title"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <div className="Product-Edit-Form-Row">
            <FormInput
              customStyle={{ marginRight: "20px" }}
              placeholder={"Price"}
              name={"price"}
              errors={errors}
              register={register}
              onChange={(value: any) => setPrice(value)}
              required={{ required: true }}
            />
            <FormInput
              placeholder={"Discount"}
              name={"discount"}
              errors={errors}
              register={register}
              onChange={(value: any) => setDiscount(value)}
              required={{ required: true }}
            />
          </div>
          <p className="Product-Edit-Form-Price">
            Finally price: {price * (1 - discount / 100)}
          </p>
          <FormSelect
            placeholder={"Category"}
            name={"category"}
            options={categories}
            errors={errors}
            register={register}
            onChange={(value: string) => setCategory(value)}
            required={{ required: true }}
          />
          <FormSelect
            placeholder={"Sub Categories(Firstly select category)"}
            name={"sub_categories"}
            options={sub_categories.filter(
              (item: any) => item.category._id === category
            )}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Descriptions"}
            name={"descriptions"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Life Conditions"}
            name={"life_conditions"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Composition"}
            name={"сomposition"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <input
            type="submit"
            className="Product-Edit-Form-Button"
            value="Create"
          />
        </form>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    last_photo: state.image.last_photo,
    categories: state.category.categories,
    singleProduct: state.product.singleProduct,
    sub_categories: state.sub_category.subCategories,
    subCategoriesLoading: state.sub_category.loading,
    categoriesLoading: state.category.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCreatePhoto: (image: any) => dispatch(fetchCreatePhoto(image)),
  fetchSingleProduct: (productId: string) =>
    dispatch(fetchSingleProduct(productId)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchAllSubCategories: () => dispatch(fetchAllSubCategories()),
  fetchUpdateProduct: (
    updated_product: Product,
    productId: string,
    history: any
  ) => dispatch(fetchUpdateProduct(updated_product, productId, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProductContainer);
