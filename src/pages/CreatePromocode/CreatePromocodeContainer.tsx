import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./create-promocode.scss";
import { useHistory } from "react-router-dom";
import { fetchCreatePromocode } from "../../redux/promocode/actions";
import { Promocode } from "../../common/types/Types";

type CreatePromocode = {
  code: string;
  discount: number;
};

interface CreatePromocodeProps {
  fetchCreatePromocode: (created_promocode: Promocode, history: any) => void;
}

const CreatePromocodeContainer: FC<CreatePromocodeProps> = ({
  fetchCreatePromocode,
}) => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: CreatePromocode) => {
    fetchCreatePromocode(
      {
        code: data.code,
        discount: Number(data.discount),
      },
      history
    );
  };

  return (
    <div className="Promocode-Create">
      <div className="Promocode-Create-Header">
        <p className="Promocode-Create-Header-Title">Creat Promocode</p>
        <div className="Promocode-Create-Header-Button"></div>
      </div>
      <form className="Promocode-Create-Form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder={"Code"}
          name={"code"}
          errors={errors}
          register={register}
          required={{ required: true }}
        />
        <FormInput
          placeholder={"Discount"}
          name={"discount"}
          errors={errors}
          register={register}
          required={{ required: true }}
        />
        <input
          type="submit"
          className="Promocode-Create-Form-Button"
          value="Create"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCreatePromocode: (created_promocode: Promocode, history: any) =>
    dispatch(fetchCreatePromocode(created_promocode, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePromocodeContainer);
