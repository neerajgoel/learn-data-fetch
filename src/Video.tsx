import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import { LearnDataFetch } from './LearnDataFetch';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="LearnDataFetch"
				component={LearnDataFetch}
				durationInFrames={400 * 30}
				fps={30}
				width={1920}
				height={1080}
				// defaultProps={{
				// 	titleText: 'Welcome to Remotion',
				// 	titleColor: 'black',
				// }}
			/>
		</>
	);
};
