import React from "react";
import { Form, Container, Grid, Segment, Header, Icon, Button } from "semantic-ui-react";



export default class Uploadtest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carnetVaccination: "",
            carteIdentitePassport: "",
            carteVital: "",
            CV: "",
            permisConduire: "",
            assuranceAutomobile: "",
            photo: "",
            RIB: "",


        };
    }

    onChangeCarnetVaccination = (e) => {
        this.setState({
            carnetVaccination: e.target.files
        });
        console.log("CarnetVaccination", e.target.files);
    };
    onChangeCV = (e) => {
        this.setState({
            CV: e.target.files,
        });
        console.log("CV", e.target.files);
    };

    render() {
        return (
            <div>
                <Container>
                    <Grid className="segment centered">
                        <Segment placeholder>
                            <Header icon>
                                <Icon name='pdf file outline' />
                                 No documents are listed for this customer.
                            </Header>
                            <Button primary>Upload</Button>
                            CarnetVaccination<input type="file"
                                type="file" name="file" onChange={this.onChangeCarnetVaccination} />
                            {/* CV<input type="file" name="file" onChange={this.onChangeCV} /> */}
                        </Segment>
                    </Grid>
                </Container>
            </div>

        )
    }
}


