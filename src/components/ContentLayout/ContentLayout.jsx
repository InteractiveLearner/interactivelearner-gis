import MainLayout from "../MainLayout/MainLayout.jsx";
import Authors from "../Authors/Authors.jsx";
import Card from "../Card/Card.jsx";
import Container from "../Container/Container.jsx";
import Quiz from "../Quiz/Quiz.jsx";
import Sources from "../Sources/Sources.jsx";
import Title from "../Title/Title.jsx";

const ContentLayout = ({
  title,
  content,
  questions,
  sources,
  authors,
}) => {
  return (
    <MainLayout>
      <Title name={title} /> 
      <Container>
        <Card>
          {content()}
        </Card>
        <h2>Test Your Knowledge</h2>
        <Quiz questions={questions} />
        <Sources sources={sources} />
        <Authors authors={authors} />
      </Container>
    </MainLayout>
  );
};

export default ContentLayout;
