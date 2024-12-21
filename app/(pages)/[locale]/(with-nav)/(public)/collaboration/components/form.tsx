"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { useFormik } from "formik";
import axiosInstance from "@/app/lib/axios";
import { useLoading } from "@/app/hooks";
import { toast } from "sonner";
import * as Yup from "yup";
import { OrgButton, OrgInput, OSpace } from "@/components/shared-ui";
import CollaborationContent from "./content";

export default function CollaborationForm() {
  const { dict } = useLocale();

  const { startLoading, stopLoading, isLoading } = useLoading();

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      full_name: "",
      brand_name: "",
      social_link: "",
      email: "",
      phone_number: "",
      country_and_city_residence: "",
      type_of_collaboration: "",
      field_of_work: "",
      collaboration_goal: "",
      collaboration_idea_desc: "",
      how_did_you_hear_us: "",
    },
    validationSchema: Yup.object().shape({
      phone_number: Yup.string().required(dict.common.phone_number_is_required),
      full_name: Yup.string().required(dict.common.full_name_is_required),
      email: Yup.string()
        .required(dict.common.email_is_required)
        .email(dict.common.please_insert_valid_email),
    }),
    onSubmit: (values, actions) => {
      startLoading();
      axiosInstance
        .post(`/collaboration`, values)
        .then((res) => {
          stopLoading();
          actions.resetForm();
          toast.success(dict.common.collaboration_form_submitted);
        })
        .catch((err) => {
          stopLoading();
        });
    },
  });

  return (
    <>
      <strong className='font-medium text-sm whitespace-pre-line'>
        {dict.common.collaboration_form_desc}
      </strong>
      <OSpace height={16} />
      <CollaborationContent
        title={dict.common.basic_information}
        content={
          <form
            id='collaboration_form'
            onSubmit={handleSubmit}
            className='flex flex-col items-start gap-y-8'
          >
            <div className='grid grid-cols-12 gap-4 w-full'>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.full_name}
                  {...getFieldProps("full_name")}
                  error={!!errors.full_name && !!touched.full_name}
                  helperText={(!!touched.full_name && errors.full_name) || ""}
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.brand_name}
                  {...getFieldProps("brand_name")}
                  error={!!errors.brand_name && !!touched.brand_name}
                  helperText={(!!touched.brand_name && errors.brand_name) || ""}
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.social_link}
                  {...getFieldProps("social_link")}
                  error={!!errors.social_link && !!touched.social_link}
                  helperText={
                    (!!touched.social_link && errors.social_link) || ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.email_address}
                  {...getFieldProps("email")}
                  error={!!errors.email && !!touched.email}
                  helperText={(!!touched.email && errors.email) || ""}
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.phone_number}
                  {...getFieldProps("phone_number")}
                  error={!!errors.phone_number && !!touched.phone_number}
                  helperText={
                    (!!touched.phone_number && errors.phone_number) || ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.country_and_city_residence}
                  {...getFieldProps("country_and_city_residence")}
                  error={
                    !!errors.country_and_city_residence &&
                    !!touched.country_and_city_residence
                  }
                  helperText={
                    (!!touched.country_and_city_residence &&
                      errors.country_and_city_residence) ||
                    ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.type_of_collaboration}
                  {...getFieldProps("type_of_collaboration")}
                  error={
                    !!errors.type_of_collaboration &&
                    !!touched.type_of_collaboration
                  }
                  helperText={
                    (!!touched.type_of_collaboration &&
                      errors.type_of_collaboration) ||
                    ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.field_of_work}
                  {...getFieldProps("field_of_work")}
                  error={!!errors.field_of_work && !!touched.field_of_work}
                  helperText={
                    (!!touched.field_of_work && errors.field_of_work) || ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.collaboration_goal}
                  {...getFieldProps("collaboration_goal")}
                  error={
                    !!errors.collaboration_goal && !!touched.collaboration_goal
                  }
                  helperText={
                    (!!touched.collaboration_goal &&
                      errors.collaboration_goal) ||
                    ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.collaboration_idea_desc}
                  {...getFieldProps("collaboration_idea_desc")}
                  error={
                    !!errors.collaboration_idea_desc &&
                    !!touched.collaboration_idea_desc
                  }
                  helperText={
                    (!!touched.collaboration_idea_desc &&
                      errors.collaboration_idea_desc) ||
                    ""
                  }
                />
              </div>
              <div className='col-span-12 md:col-span-6'>
                <OrgInput
                  label={dict.common.how_did_you_hear_us}
                  {...getFieldProps("how_did_you_hear_us")}
                  error={
                    !!errors.how_did_you_hear_us &&
                    !!touched.how_did_you_hear_us
                  }
                  helperText={
                    (!!touched.how_did_you_hear_us &&
                      errors.how_did_you_hear_us) ||
                    ""
                  }
                />
              </div>
            </div>
            <div className='w-full'>
              <OrgButton
                type='submit'
                loading={isLoading}
                className='w-full md:w-auto'
              >
                {dict.common.submit}
              </OrgButton>
            </div>
          </form>
        }
      />
    </>
  );
}
