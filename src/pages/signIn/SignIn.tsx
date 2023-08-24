import * as S from '../../utils/styles/Sign.styles';
import ROUTES from '../../utils/constants/Routes';
import { useNavigate } from 'react-router';
import useInputs from '../../hooks/useInputs';
import { isValidEmail, isValidPassword } from '../../utils/validations/Validation';
import { AuthForm } from '../../utils/types/Auth.interface';
import { FormEvent } from 'react';
import { authApi } from '../../api/AuthApi';

export default function SignInPage() {
	const navigate = useNavigate();

	const initialValue = { email: '', password: '' };

	const { data, handleChange, reset } = useInputs(initialValue);
	const { email, password } = data as AuthForm;

	const handleClickSignIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await authApi.signin({ email, password });
			reset();
			navigate('/todo');
		} catch (error) {
			if (error instanceof Error) alert(error.message);
		}
	};
	return (
		<>
			<form onSubmit={handleClickSignIn}>
				<S.SignWrapper>
					<S.SignBox>
						<S.SignLink to={ROUTES.SIGNUP}>회원가입</S.SignLink>
					</S.SignBox>
					<S.LogoBox>
						<S.ImgBox src="/logo.png" />
						<S.ToDoTile>SignIn Page</S.ToDoTile>
					</S.LogoBox>
					<S.FormBox>
						<S.InputBox>
							<S.Input
								data-testid="email-input"
								type="email"
								name="email"
								placeholder="이메일을 입력해주세요."
								onChange={handleChange}
								value={email}
								autoComplete="off"
							/>
							<S.ErrorBox>
								{!isValidEmail(email) && (
									<span className="error-message">이메일 형식을 지켜주세요.</span>
								)}
							</S.ErrorBox>
							<S.Input
								data-testid="password-input"
								type="password"
								name="password"
								placeholder="비밀번호를 입력해주세요."
								onChange={handleChange}
								value={password}
							/>
							<S.ErrorBox>
								{!isValidPassword(password) && (
									<span className="error-message">비밀번호는 8자 이상 입력해주세요.</span>
								)}
							</S.ErrorBox>
						</S.InputBox>
						<S.LogBox>
							<S.LogBtn
								data-testid="signin-button"
								style={{
									backgroundColor: isValidEmail(email) && isValidPassword(password) ? 'yellow' : '',
								}}
								disabled={!isValidEmail(email) || !isValidPassword(password)}
							>
								로그인하기
							</S.LogBtn>
						</S.LogBox>
					</S.FormBox>
				</S.SignWrapper>
			</form>
		</>
	);
}
