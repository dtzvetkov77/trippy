import ContactImg from "../../assets/1.jpg";
import EditForm from "../../components/EditForm/EditForm";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

const Edit = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={ContactImg}
        title="Edit"
        btnClass="hide"
        textCName="hero-mid-text"
      />
      <EditForm />
      <Footer />
    </>
  );
};

export default Edit;
