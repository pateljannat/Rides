# Copyright (c) 2024, Jannat Patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class RideOrder(Document):
	def validate(self):
		self.validate_user()

	def validate_user(self):
		if not self.user:
			self.user = frappe.session.user
