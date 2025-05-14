import * as Yup from "yup"
import { PRIORITIES } from "../constants/priority"
export function getTodoSchema(config = {}) {
    const { isNew = false } = config;
    let deadlineRule = Yup.string().nullable().transform((value, originalValue) => originalValue === "" ? null : value).matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be valid in  YYYY-MM-DD format")
    if (isNew) {
        deadlineRule = deadlineRule.test(
            "is-future-date",
            "Deadline can't be in past",
            (value) => {
                const today = new Date().toISOString().split("T")[0];
                return value ? value >= today : true;
            }
        );
    }

    return Yup.object().shape({
        name: Yup.string().required("Name is required").min(3, "Name should be greater than 3 charcters").max(50, "Name should be less than 50 charcters"),
        description: Yup.string().max(200, "descripton should be less than 200 characters "),
        deadline: deadlineRule,
        priority: Yup.string().required("Priority is not a valid value").oneOf(Object.keys(PRIORITIES))
    })
}