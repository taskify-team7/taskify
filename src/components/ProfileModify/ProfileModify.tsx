import React from 'react';
import style from './ProfileModify.module.css';
import BaseButton from '../BaseButton/BaseButton';
import CommonInput from '../Input/CommonInput';
import { useForm } from 'react-hook-form';
import ProfileImgInput from '../Input/ProfileImgInput';
import { changeMyInfo } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfileModify() {
  const navigator = useNavigate();

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

  const imageValidation = register('imageUrl');

  const onSubmit = async (data: any) => {
    const profileData = {
      nickname: data.nickName,
      profileImageUrl: data.imageUrl,
    };
    try {
      const res = await changeMyInfo(profileData);
      alert('프로필이 변경되었습니다.');
      navigator('/dashboard');      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.mainText}>프로필</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.totalInputContainer}>
          <div className={style.imgInputContainer}>
            <ProfileImgInput validation={imageValidation} setValue={setValue} />
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
