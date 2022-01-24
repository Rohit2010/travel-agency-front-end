import React from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

function Report() {

  return (
    <>
      <Typography
        style={{
          marginTop: "110px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
      
        <Button
          style={{
            fontWeight: "bold",
            color: "#505152",
            textTransform: "none",
            borderRadius: "20px",
            fontSize: "17px",
          }}
          variant="outlined"
        >
          Report by order No
        </Button>
        <Button
          style={{
            fontWeight: "bold",
            color: "#505152",
            textTransform: "none",
            borderRadius: "20px",
            fontSize: "17px",
          }}
          variant="outlined"
        >
          Report by BK No
        </Button>
        <Button
          style={{
            fontWeight: "bold",
            color: "#505152",
            textTransform: "none",
            borderRadius: "20px",
            fontSize: "17px",
          }}
          variant="outlined"
        >
          Report by Brand
        </Button>
      </Typography>
      <Typography
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-evenly",
          marginLeft: "70px",
          marginRight: "70px",
          // convert these pixls to perncentage
        }}
      >
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga libero
          voluptatem eaque cumque quod officiis perferendis, omnis perspiciatis.
          Sed animi a officiis, ratione, molestiae culpa, impedit molestias ab
          vero quia similique ipsum illum quae mollitia voluptatibus aliquid eum
          fugiat. Hic culpa possimus quod sint veniam, perspiciatis blanditiis
          esse? Dicta, veniam. In maiores, repellat labore delectus dolore dolor
          facilis esse quibusdam blanditiis eveniet magni non neque nihil alias
          deserunt impedit ut minus ducimus rerum quod porro? Aliquam omnis
          necessitatibus ab cupiditate enim? Nobis, sapiente rerum! Assumenda
          perspiciatis inventore repudiandae odio. Et aspernatur, corporis rem
          voluptatibus fugit soluta ab commodi aliquam id atque ipsa. Animi quo
          saepe odit illum quae nulla, facilis tempore et? Totam ad earum fugiat
          numquam debitis harum minus sequi illum ullam molestiae perferendis
          amet distinctio eaque consequatur vero dolores quibusdam eveniet, vel
          accusamus recusandae modi necessitatibus iure. Unde, harum.
          Repudiandae illo reiciendis, debitis laboriosam doloribus dolorum
          minima cupiditate rem repellat? Quo quam laudantium libero itaque
          doloribus quasi error velit ipsum repellat labore! Quos assumenda
          vitae ex sit sapiente incidunt debitis obcaecati enim temporibus
          quibusdam. Ea veritatis a optio illum eveniet qui suscipit,
          reprehenderit libero et obcaecati quam quaerat sunt, voluptates sed
          similique quae temporibus magni laborum dolores. Error repellendus sit
          repudiandae possimus. Explicabo aut iusto rerum soluta quibusdam
          necessitatibus excepturi unde quaerat recusandae tenetur ab hic
          assumenda sunt minus accusamus sapiente architecto, vel sequi rem
          consequatur quis reiciendis error at inventore! Suscipit similique
          cumque blanditiis earum tenetur natus iure ipsa molestiae odit dicta
          possimus, voluptates nihil, ut eveniet delectus officia, hic
          consequatur quo. In ut debitis rerum ex cumque sapiente iste dolorum
          eligendi, animi quam pariatur minima est error sunt aperiam voluptatem
          accusantium sequi atque fugit! Quas veritatis sed ratione illum esse
          iste atque deleniti mollitia nostrum eos repellendus provident quidem,
          facilis qui blanditiis! Architecto quisquam eveniet ex.
        </Typography>
      </Typography>
      <Typography
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginLeft: "70px",
          marginRight: "70px",
        }}
      >
        <Typography>
          <Button
            style={{ textTransform: "none", borderRadius: "20px" }}
            variant="contained"
            color="primary"
          >
            Export to PDF
          </Button>
          <Button
            style={{
              marginLeft: "10px",
              textTransform: "none",
              borderRadius: "20px",
            }}
            variant="contained"
            color="primary"
          >
            Export to excel
          </Button>
        </Typography>
      </Typography>
    </>
  );
}
export default Report;
