import React from 'react';
import BaseButton from '../BaseButton/BaseButton';
import ImageInput from '../Input/ImageInput';
import CommonInput from '../Input/CommonInput';

export default function ProfileModify() {
  const onSubmitHandle = () => {
    console.log('임시 저장 ㅇㅇ');
  };
  return (
    <div>
      <div>프로필</div>
      <form>
        <div>
          sdf
        </div>
        <div>
          <CommonInput label={'이메일'} />
          <CommonInput label={'닉네임'} />
        </div>
        <BaseButton text="저장" styleType="accept" onClick={onSubmitHandle} />
      </form>
    </div>
  );
}
