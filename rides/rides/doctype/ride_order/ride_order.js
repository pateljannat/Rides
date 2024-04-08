// Copyright (c) 2024, Jannat Patel and contributors
// For license information, please see license.txt

frappe.ui.form.on("Ride Order", {
    refresh(frm) {
        frm.set_query("user", (frm) => {
            return {
                filters: {
                    "ignore_user_type": true
                }
            }
        })

        frm.set_query("vehicle", (frm) => {
            return {
                filters: {
                    "status": "Available"
                }
            }
        })

        if (frm.doc.docstatus === 1) {
            frm.add_custom_button(__("Create Ride"), () => {
                let dialog = new frappe.ui.Dialog({
                    title: __("Select a Driver"),
                    fields: [
                        {
                            fieldname: "driver",
                            label: __("Driver"),
                            fieldtype: "Link",
                            options: "Driver",
                            reqd: 1
                        }
                    ],
                    primary_action_label: __("Create Ride"),
                    primary_action: (data) => {
                        frappe.new_doc("Ride", {
                            vehicle: frm.doc.vehicle,
                            driver: data.driver,
                            order: frm.doc.name
                        })
                    }
                })
                dialog.show();
            })
        }
    },
});
