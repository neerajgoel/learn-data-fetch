import { useCurrentFrame } from "remotion";

interface IInnerContainerProps {
    metadata: any;
    d: string;
    frameIndex: number;
}

function getRollNo(d: string, frameIndex: number){
    let log = `getRollNo() \t
        frameIndex: ${frameIndex} \t
        d: ${d}`;
    console.log(log);
    let myJSON = JSON.parse(d);
    if (myJSON != null) {
        let rollno = myJSON.students[frameIndex].rollno;
        return rollno;
    }
    return -1;
}

export function InnerContainer(props: IInnerContainerProps) {

    const { d, metadata, frameIndex } = props;
    const frame = useCurrentFrame();

    return (
        <div style={{
            position: 'absolute',
            width: '400px',
            height: '200px',
            marginLeft: '50px',
            marginTop: '200px'
        }}>
            <h1> {getRollNo(d, frameIndex)} </h1>
        </div>
    )

}