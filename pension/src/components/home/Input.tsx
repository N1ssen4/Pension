import React, { ChangeEventHandler, FocusEventHandler } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import CurrencyInput from "react-currency-input-field";
import { InfoModal } from "./InfoModal";

//Input props
export interface InputProps {  
  defaultValue?: string | number ;
  type: string;
  name: string;
  labelname: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number;
  placeholder?: string;
  readOnly?: boolean;
  step?: string;
  submitIndicator?: React.ReactNode;
  currencyField?: boolean;
  errorField?: React.ReactNode;
  disabled?: boolean;
}
//Input component for all the inputs. 
const Input = ({
  type,
  name,
  onBlur,
  onChange,
  placeholder,
  readOnly,
  defaultValue,
  step,
  labelname,
  currencyField,
  errorField,
  disabled = false,
}: InputProps) => {
  
  const [isModalOpen, setModalState] = React.useState(false);
  const toggleModal = () => setModalState(!isModalOpen);
  return (
    <div className="grid place-content-center p-5">
      <div className="grid">
        <label
          data-test-id={name}
          className="flex justify-center gap-2 font-semibold"
          htmlFor={name}
        >
          {labelname}
          <div className="my-auto">
            {name !== "name" && name !== "birthYear" ? (
              <button onClick={toggleModal} key={name}>
                <QuestionMarkCircleIcon
                  id="navn"
                  className="h-[17px] w-[17px] stroke-[#8E9197]"
                />
              </button>
            ) : null}
          </div>
        </label>
        {name === "salary" ? (
          <InfoModal id={name} isOpen={isModalOpen} onclose={toggleModal}>
            Tjek din lønseddel hvis du er i tvivl
          </InfoModal>
        ) : name === "pensionSaving" ? (
          <InfoModal id={name} isOpen={isModalOpen} onclose={toggleModal}>
            Tjek penionsinfo.dk hvis du ikke ved det.
          </InfoModal>
        ) : name === "pensionPayment" ? (
          <InfoModal id={name} isOpen={isModalOpen} onclose={toggleModal}>
            Tjek din lønseddel hvis du er i tvivl.
          </InfoModal>
        ) : null}
        {!currencyField ? (
          <>
            <input
              data-test-id-input={name}
              className="w-[160px] rounded-full border py-2 text-center"
              placeholder={placeholder}
              type={type}
              name={name}
              step={step}
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={defaultValue}
              readOnly={readOnly}
              disabled={disabled}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </>
        ) : (
          <CurrencyInput
            data-test-id-input={name}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            name={name}
            groupSeparator="."
            decimalSeparator=","
            className="mx-auto w-[160px] rounded-full border py-2 text-center"
            defaultValue={defaultValue}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      </div>
      <div className="">{errorField}</div>
    </div>
  );
};

export default Input;
