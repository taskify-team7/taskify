import React, { useRef, useState } from 'react';
import style from './ProfileInput.module.css';

interface ProfileImgProps {
  name: string;
  value?: string;
  initialPreview: string;
  onChange: () => void;
}

function ProfileInput({
  name,
  value,
  initialPreview,
  onChange,
}: ProfileImgProps) {

  // 부모 컴포넌트로부터 받아온 initialPreview === imgUrl
  const inputRef = useRef();
  // 미리보기이미지 상태에 initialPreview를 초기값으로 설정
  const [preview, setPreview] = useState(initialPreview);

  const handleChange = (e: any) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    // 미리보기 이미지가 없다면 얼리리턴
    if (!value) {
      return;
    }
    // filelist 객체를 URL.createObjectURL() 함수를 사용하여 URL로 변환
    // 선언할 때 마다 새로운 메모리를 할당함.
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // 컴포넌트가 언마운트 될 때 URL.revokeObjectURL() 함수를 사용하여 메모리 해제
    return () => {
      // 초기 미리보기 설정
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div className={`FileInput ${className}`}>
      <img
        className={`FileInput-preview ${preview ? 'selected' : ''}`}
        src={preview || placeholderImg}
        alt="이미지 미리보기"
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} alt="선택해제" />
        </button>
      )}
    </div>
  );
}

export default ProfileInput;
