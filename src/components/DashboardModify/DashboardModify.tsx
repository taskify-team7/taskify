import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommonInput from '../Input/CommonInput';
import BaseButton from '../BaseButton/BaseButton';
import ColorSelector from '../Modal/ColorSelector';
import { DashBoardType } from '../../interface/DashboardType';
import { useLocation, useParams } from 'react-router-dom';
import { dashboardModify } from '../../api/dashboard';
import { useQueryClient } from '@tanstack/react-query';

function DashboardModify() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  // queryClient.getQueryData를 사용해 구현하려했으나 undefined가 나오며 실패해 다른 방법 사용함
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState<DashBoardType | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  // 리렌더 이슈가있어 useEffect로 방지
  useEffect(() => {
    // 해당 id의 대쉬보드 정보를 받아오는 data
    const { data } = location.state?.data as { data: DashBoardType };
    setDashboardData(data);
    setSelectedColor(data.color);

  }, [id]);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTitle(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedColor && dashboardData) {
        dashboardModify(title, selectedColor, Number(id));
        alert('수정 성공');
        queryClient.setQueryData<DashBoardType | undefined>(
          ['dashboard', id],
          (oldData) => {
            if (oldData) {
              return {
                ...oldData,
                title,
                color: selectedColor,
              };
            }
            return oldData;
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {dashboardData && (
        <form onSubmit={onSubmit}>
          <div>
            <h2>{dashboardData?.title}</h2>
            <ColorSelector
              selectedColor={selectedColor}
              selectColor={handleSelectColor}
            />
          </div>
          <CommonInput
            label="대시보드 이름"
            placeholder="변경할 이름을 입력해주세요"
            value={title}
            inputOnChange={handleTitle}
          />
          <div>
            <BaseButton text="변경" type="submit" styleType="accept" />
          </div>
        </form>
      )}
    </div>
  );
}

export default DashboardModify;
