import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./create-product.scss";
import {
  fetchAllCategories,
  fetchCreateCategory,
} from "../../redux/categories/actions";
import { useHistory } from "react-router-dom";
import { FormSelect } from "../../components/FormSelect/FormSelect";
import { fetchAllSubCategories } from "../../redux/sub_categories/actions";
import { fetchCreateProduct } from "../../redux/products/actions";
import { Product } from "../../common/types/Types";
import { firestore } from "../../common/firebase";

type CreateCategory = {
  title: string;
  price: number;
  discount: number;
  category: string;
  sub_categories: string;
  descriptions: string;
  life_conditions: string;
  сomposition: string;
};

interface CreateProductProps {
  fetchCreatePhoto: (image: any) => void;
  fetchAllCategories: () => void;
  fetchAllSubCategories: () => void;
  fetchCreateProduct: (created_product: Product, history: any) => void;
  last_photo: string | undefined;
  categories: any;
  sub_categories: any;
  subCategoriesLoading: boolean;
  categoriesLoading: boolean;
}

const CreateProductContainer: FC<CreateProductProps> = ({
  fetchCreatePhoto,
  fetchCreateProduct,
  fetchAllSubCategories,
  fetchAllCategories,
  last_photo,
  categories,
  sub_categories,
  subCategoriesLoading,
  categoriesLoading,
}) => {
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { register, handleSubmit, errors, getValues } = useForm();

  useEffect(() => {
    fetchAllSubCategories();
    fetchAllCategories();
  }, []);

  const handleImageAsFile = async (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    await fetchCreatePhoto(image);
    setPhotoLoad(true);
  };
  const onSubmit = (data: CreateCategory) => {
    if (isPhotoLoad && last_photo)
      fetchCreateProduct(
        {
          title: data.title,
          price: {
            current: data.price,
            discount: data.discount,
          },
          descriptions: data.descriptions,
          category: firestore.doc(`category/${data.category}`),
          images: [last_photo],
          life_conditions: data.life_conditions,
          sub_category: firestore.doc(`sub_category/${data.sub_categories}`),
          сomposition: data.сomposition,
        },
        history
      );
  };

  return (
    <div className="Product-Create">
      <div className="Product-Create-Header">
        <p className="Product-Create-Header-Title">Creat Product</p>
        <div className="Product-Create-Header-Button"></div>
      </div>
      {sub_categories && categories ? (
        <form className="Product-Create-Form" onSubmit={handleSubmit(onSubmit)}>
          {isPhotoLoad ? (
            <img
              className="Product-Create-Form-Selected-Image"
              src={last_photo}
            />
          ) : (
            <div className="Product-Create-Form-Image-Empty">
              <p>Image not added</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="Product-Create-Form-Image"
            onChange={handleImageAsFile}
          />
          <FormInput
            placeholder={"Title"}
            name={"title"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <div className="Product-Create-Form-Row">
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
          <p className="Product-Create-Form-Price">
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
            className="Product-Create-Form-Button"
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
    sub_categories: state.sub_category.subCategories,
    subCategoriesLoading: state.sub_category.loading,
    categoriesLoading: state.category.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCreatePhoto: (image: any) => dispatch(fetchCreatePhoto(image)),
  fetchCreateProduct: (created_product: Product, history: any) =>
    dispatch(fetchCreateProduct(created_product, history)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchAllSubCategories: () => dispatch(fetchAllSubCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProductContainer);
