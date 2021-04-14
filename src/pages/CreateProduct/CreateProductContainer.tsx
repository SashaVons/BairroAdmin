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
  title_pt: string;
  price: number;
  old_price: number;
  storage_count: string;
  storage_info: string;
  sub_categories: Array<any>;
  descriptions: string;
  descriptions_pt: string;
  life_conditions: string;
  life_conditions_pt: string;
  сomposition: string;
  сomposition_pt: string;
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
  const [oldPrice, setOldPrice] = useState(0);
  const { register, handleSubmit, errors, getValues, control } = useForm();

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
          title_pt: data.title_pt,
          price: {
            current: Number(data.price),
            old: data.old_price ? Number(data.old_price) : 0,
            discount: data.old_price
              ? Number(Math.floor(100 - price / (oldPrice / 100))) < 0
                ? 0
                : Number(Math.floor(100 - price / (oldPrice / 100)))
              : 0,
          },
          storage_count: data.storage_count,
          storage_info: data.storage_info,
          descriptions: data.descriptions,
          descriptions_pt: data.descriptions_pt,
          images: [last_photo],
          sub_category: data.sub_categories.map((el: any) =>
            firestore.doc(`sub_category/${el.value}`)
          ),
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
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Title"}
            name={"title_pt"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <div className="Product-Create-Form-Row">
            <FormInput
              customStyle={{ marginRight: "20px" }}
              placeholder={"Current Price"}
              name={"price"}
              type={"number"}
              errors={errors}
              register={register}
              onChange={(value: any) => setPrice(value)}
              required={{ required: true }}
            />
            <FormInput
              placeholder={"Old Price"}
              name={"old_price"}
              type={"number"}
              errors={errors}
              register={register}
              onChange={(value: any) => setOldPrice(value)}
              required={{}}
            />
          </div>
          <p className="Product-Create-Form-Price">
            Finally discount:
            {oldPrice
              ? Number(Math.floor(100 - price / (oldPrice / 100))) < 0
                ? 0
                : Number(Math.floor(100 - price / (oldPrice / 100)))
              : 0}
          </p>
          <FormInput
            placeholder={"Storage Count"}
            name={"storage_count"}
            type={"number"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Storage Info"}
            name={"storage_info"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormSelect
            placeholder={"Sub Categories(Firstly select category)"}
            name={"sub_categories"}
            options={sub_categories.map((el: any) => {
              return { value: el._id, label: el.name };
            })}
            errors={errors}
            control={control}
            required={{ required: true }}
            multi={true}
          />
          <FormInput
            placeholder={"Descriptions"}
            name={"descriptions"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Descriptions"}
            name={"descriptions_pt"}
            type={"text"}
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
