import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

// import { Header, Divider, Box, List} from

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const result = await prisma.person.findOne({
    where: { name: params?.name as string },
    include: { weighIns: true }
  });

  console.log(result);

  return {
    props: { test: JSON.stringify(result) }
  };
};

export const PersonPage: React.FunctionComponent = ({ test }: any) => {
  const data = JSON.parse(test);

  console.log(data);

  return (
    <div>
      <h1>{data.nickName}</h1>
      <div>
        <h3>Results</h3>
        <ul>
          {data.weighIns.map((weighIn: any) => {
            return <li key={weighIn.id}>{weighIn.weight}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PersonPage;
