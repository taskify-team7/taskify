import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CommonInput from "../Input/CommonInput";
import ColorSelector from "../Modal/ColorSelector";
import { DashBoardType } from "../../interface/DashboardType";
import { useParams } from "react-router-dom";
import { updateDashboard } from "../../api/dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import style from "./DashboardModify.module.css";
import { toast } from "react-toastify";
import Button from "../Button/BaseButton/BaseButton";

function DashboardModify() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const dashboardData = queryClient.getQueryData<DashBoardType | undefined>([
    "dashboard",
    id,
  ]);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const { mutate } = useMutation({
    mutationFn: () => updateDashboard(title, selectedColor!, Number(id)),
    onSettled: () => {
      const updatedDashboardData = {
        id: Number(id),
        title,
        color: selectedColor,
      };

      queryClient.setQueryData(["dashboard", id], updatedDashboardData);
      queryClient.invalidateQueries({ queryKey: ["dashboardList"] });
    },
  });

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    if (dashboardData) {
      setTitle(dashboardData.title);
    }
  }, [dashboardData]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedColor && dashboardData) {
        mutate();
        toast.success("대시보드 이름이 수정되었습니다.");
        setTitle(title);
        setSelectedColor(selectedColor);
      } else if (title === "") {
        toast.error("변경될 이름을 입력해주세요.");
      } else {
        toast.error("색상을 선택해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.container}>
      {dashboardData && (
        <form onSubmit={onSubmit}>
          <div className={style.titleNBtn}>
            <h2>{dashboardData?.title}</h2>
            <ColorSelector
              selectedColor={selectedColor}
              selectColor={handleSelectColor}
            />
          </div>
          <CommonInput
            label="대시보드 이름"
            placeholder="변경할 이름을 입력해주세요"
            inputOnChange={handleTitle}
          />
          <div className={style.buttonContainer}>
            <Button.Accept type="submit">변경</Button.Accept>
          </div>
        </form>
      )}
    </div>
  );
}

export default DashboardModify;
