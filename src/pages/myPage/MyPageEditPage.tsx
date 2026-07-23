import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";

import BirthDateField from "../../components/myPage/BirthDateField";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import NicknameField from "../../components/myPage/NicknameField";
import ProfileImageEditor from "../../components/myPage/ProfileImageEditor";

const DEFAULT_NICKNAME = "타카";
const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 10;

const MyPageEditPage = () => {
  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const [nickname, setNickname] =
    useState(DEFAULT_NICKNAME);

  const [birthDate, setBirthDate] =
    useState("");

  const [
    profileImageUrl,
    setProfileImageUrl,
  ] = useState("");

  const [
    nicknameError,
    setNicknameError,
  ] = useState("");

  const validateNickname = (
    value: string,
  ) => {
    const trimmedValue =
      value.trim();

    if (
      trimmedValue.length <
      NICKNAME_MIN_LENGTH
    ) {
      return "닉네임은 2자 이상 입력해주세요.";
    }

    if (
      trimmedValue.length >
      NICKNAME_MAX_LENGTH
    ) {
      return "닉네임은 10자 이하로 입력해주세요.";
    }

    const nicknamePattern =
      /^[가-힣a-zA-Z0-9]+$/;

    if (
      !nicknamePattern.test(
        trimmedValue,
      )
    ) {
      return "한글, 영문, 숫자만 사용할 수 있어요.";
    }

    return "";
  };

  const handleNicknameChange = (
    value: string,
  ) => {
    setNickname(value);

    if (nicknameError) {
      setNicknameError(
        validateNickname(value),
      );
    }
  };

  const handleImageButtonClick =
    () => {
      imageInputRef.current?.click();
    };

  const handleProfileImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const imageFile =
      event.target.files?.[0];

    if (!imageFile) {
      return;
    }

    const newImageUrl =
      URL.createObjectURL(imageFile);

    setProfileImageUrl(newImageUrl);
  };

  const isSubmitDisabled =
    Boolean(
      validateNickname(nickname),
    )

  const handleSubmit = () => {
    const errorMessage =
      validateNickname(nickname);

    if (
      errorMessage ||
      !birthDate
    ) {
      setNicknameError(
        errorMessage,
      );

      return;
    }

    setNicknameError("");

    console.log({
      nickname: nickname.trim(),
      birthDate,
      profileImageUrl,
    });
  };

  return (
    <main className="min-h-full px-[160px] pb-[120px] pt-[40px]">
      <MyPageBackHeader title="회원 정보 수정" />

      <section className="mt-[50px] flex flex-col items-center">
        <ProfileImageEditor
          nickname={
            nickname ||
            DEFAULT_NICKNAME
          }
          imageUrl={
            profileImageUrl
          }
          onImageClick={
            handleImageButtonClick
          }
        />

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={
            handleProfileImageChange
          }
          className="hidden"
        />

        <div className="mt-[30px] flex flex-col gap-[34px]">
          <NicknameField
            value={nickname}
            errorMessage={
              nicknameError
            }
            onChange={
              handleNicknameChange
            }
          />

          <BirthDateField
            value={birthDate}
            onChange={setBirthDate}
          />
        </div>

        <button
          type="button"
          disabled={
            isSubmitDisabled
          }
          onClick={handleSubmit}
          className={[
            "mt-[40px] flex h-[60px] w-[736px] items-center justify-center rounded-[10px]",
            "px-[10px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px]",
            isSubmitDisabled
              ? "cursor-not-allowed bg-[#2B2C35] text-[#717379]"
              : "bg-[#917DEC] text-white hover:opacity-90",
          ].join(" ")}
        >
          수정하기
        </button>
      </section>
    </main>
  );
};

export default MyPageEditPage;