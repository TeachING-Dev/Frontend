import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  checkNickname,
  getMyProfile,
  updateMyProfile,
} from "../../apis/users";
import BirthDateField from "../../components/myPage/BirthDateField";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import NicknameField from "../../components/myPage/NicknameField";
import ProfileImageEditor from "../../components/myPage/ProfileImageEditor";

const DEFAULT_NICKNAME = "";
const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 10;

const MyPageEditPage = () => {
  const navigate = useNavigate();
  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const [nickname, setNickname] =
    useState(DEFAULT_NICKNAME);
  const [
    originalNickname,
    setOriginalNickname,
  ] = useState(DEFAULT_NICKNAME);

  const [birthDate, setBirthDate] =
    useState("");

  const [
    profileImageUrl,
    setProfileImageUrl,
  ] = useState("");
  const [
    profileImageFile,
    setProfileImageFile,
  ] = useState<File | null>(null);

  const [
    nicknameError,
    setNicknameError,
  ] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        setNickname(profile.nickname);
        setOriginalNickname(profile.nickname);
        setBirthDate(profile.birthDate);
        setProfileImageUrl(
          profile.profileImageUrl,
        );
      } catch (error) {
        console.error(error);
      }
    };

    void loadProfile();
  }, []);

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
    setProfileImageFile(imageFile);
  };

  const isSubmitDisabled =
    Boolean(
      validateNickname(nickname),
    ) || !birthDate;

  const handleSubmit = async () => {
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

    try {
      setIsSubmitting(true);

      const trimmedNickname =
        nickname.trim();

      if (
        trimmedNickname !==
        originalNickname
      ) {
        await checkNickname(
          trimmedNickname,
        );
      }

      await updateMyProfile({
        nickname: trimmedNickname,
        ...(profileImageFile
          ? { profileImage: profileImageFile }
          : {}),
        birthYear: Number(
          birthDate.slice(0, 4),
        ),
        birthMonth: Number(
          birthDate.slice(5, 7),
        ),
        birthDay: Number(
          birthDate.slice(8, 10),
        ),
      });

      navigate("/mypage");
    } catch (error) {
      setNicknameError(
        error instanceof Error
          ? error.message
          : "닉네임 확인에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-full px-[160px] pb-[120px] pt-[40px]">
      <MyPageBackHeader title="회원 정보 수정" />

      <section className="mt-[50px] flex flex-col items-center">
        <ProfileImageEditor
          nickname={
            originalNickname ||
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
            key={birthDate}
            value={birthDate}
            onChange={setBirthDate}
          />
        </div>

        <button
          type="button"
          disabled={
            isSubmitDisabled ||
            isSubmitting
          }
          onClick={handleSubmit}
          className={[
            "mt-[40px] flex h-[60px] w-[736px] items-center justify-center rounded-[10px]",
            "px-[10px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px]",
            isSubmitDisabled ||
            isSubmitting
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