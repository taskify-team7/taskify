import React from 'react';
import style from './ProfileModify.module.css';
import BaseButton from '../BaseButton/BaseButton';
import ImageInput from '../Input/ImageInput';
import CommonInput from '../Input/CommonInput';
import { useForm } from 'react-hook-form';

export default function ProfileModify() {
  let userEmail = '';
  const userString = localStorage.getItem('user');
  if (userString) {
    const userObject = JSON.parse(userString);
    userEmail = userObject.email;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nickName: '',
      imageUrl: '',
    },
  });

  const imageValidation = register("imageUrl");

  const onSubmit = (data: any) => {
    const profileData = {
      nickname: data.nickName,
      profileImageUrl: data.imageUrl,
    }
    console.log(profileData);
    
  };

  return (
    <div className={style.container}>
      <div className={style.mainText}>프로필</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.totalInputContainer}>
          <div className={style.imgInputContainer}>
            <ImageInput
              validation={imageValidation}
              setValue={setValue}
              columnId={0}
              divStyleType="profileDiv"
              coverStyleType="profileImgCover"
              pickStyleType="profilePickImg"
              imgBtnStyleType="profileImgBtn"
            />
          </div>
          <div className={style.commonInputContainer}>
            <CommonInput
              label={'이메일'}
              placeholder={userEmail}
              disabled={true}
            />
            <CommonInput
              label={'닉네임'}
              placeholder="닉네임 입력"
              validation={register('nickName')}
            />
          </div>
        </div>
        <div className={style.BtnContainer}>
          <BaseButton text="저장" styleType="accept" type="submit" />
        </div>
      </form>
    </div>
  );
}
