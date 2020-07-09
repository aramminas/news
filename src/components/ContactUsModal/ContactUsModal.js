import React, {Component} from "react";
import "./ContactUsModal.css";

const regExpData = {
    name: /^[a-zA-Z ]{2,30}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

class ContactUsModal extends Component {

    state = {
        name: "",
        email: "",
        message: " ",
        validator: {
            name: false,
            email: false,
            message: false,
            main: false,
        },
    };

    handleChange = (ev) => {
        let value = ev.target.value?.trim();
        let name = ev.target.name;
        let valid = false;
        this.setState((prevState) => {
            return {...prevState, [name]: value};
        });

        if(name === "name"){
            valid = regExpData.name.test(value);
        }else if(name === "email"){
            valid = regExpData.email.test(String(value).toLowerCase());
        }else if(name === "message"){
            valid = value.trim() !== "";
        }

        this.setState((prevState) => {
            return {...prevState,
                [name]: value,
                validator: {...this.state.validator,
                    [name]: valid,
                    main: false,
                }
            };
        });
    };

    onSubmit = () => {
        const {name, email , message } = this.state;
        const {name: valName, email: valEmail , message: valeMessage } = this.state.validator;

        if(name === "" || !valName || email === "" || !valEmail || message === "" || !valeMessage){
            this.setState((prevState) => {
                return {...prevState,
                    validator: {...this.state.validator,
                        main: true,
                    }
                }
            });
        }else {
            document.getElementById("messages").submit();
        }
    };

    closeModal = (ev) => {
        if(ev.target.className === "contact-us-modal") {
            this.props.toggleContacts();
        }
    }

    render() {
        const {lang, toggleContacts} = this.props;

        return (
            <div className={"contact-us-modal"} onClick={(ev)=> this.closeModal(ev)}>
                <div className="modal-body">
                    <div className={"modal-header"}>
                        <span className={"modal-title ff fw"}>{lang.contact_us}</span>
                        <span className="close-icon" onClick={() => toggleContacts()}>&times;</span>
                    </div>
                    <div className={"modal-content contact-form"}>
                        <form
                            id={"messages"}
                            action="https://formspree.io/xzbpwkjk"
                            method="POST"
                        >
                            <label htmlFor="name">{lang.name}:</label>
                            <input
                                id={"name"}
                                type="text"
                                name={"name"}
                                value={this.state.name}
                                onChange={(e)=>this.handleChange(e)}
                            />
                            {(!this.state.validator.name && this.state.name !== "")  &&
                            <span className={"error-message"}>{lang.error_name}</span>
                            }
                            <label htmlFor="email">{lang.email}:</label>
                            <input
                                id={"email"}
                                type="text"
                                name={"email"}
                                value={this.state.email}
                                onChange={(e)=>this.handleChange(e)}
                            />
                            {(!this.state.validator.email && this.state.email !== "") &&
                            <span className={"error-message"}>{lang.error_email}</span>
                            }
                            <label htmlFor="message">{lang.message}:</label>
                            <textarea
                                id={"message"}
                                name="message"
                                cols="30" rows="10"
                                value={this.state.message}
                                onChange={(e)=>this.handleChange(e)}
                            />
                            {(!this.state.validator.message && this.state.message !== " ") &&
                            <span className={"error-message"}>{lang.error_message}</span>
                            }
                            {this.state.validator.main &&
                            <span className={"error-message"}>{lang.error_main}</span>
                            }
                        </form>
                    </div>
                    <div className={"modal-footer"}>
                        <button className={"btn-default ff"} onClick={() => toggleContacts()}>{lang.cancel}</button>
                        <button
                            className={"send-messages btn-blue ff"}
                            onClick={() => this.onSubmit()}
                        >{lang.send}</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default ContactUsModal;