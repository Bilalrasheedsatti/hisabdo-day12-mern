"use client";

import { useState, useEffect, useMemo } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CustomerForm from "@/components/customers/CustomerForm";
import { useCustomers } from "@/context/CustomerContext";
import { formatCurrency } from "@/lib/data";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Phone,
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";
import Table from "@/components/ui/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";

type ModalMode = "add" | "edit" | "delete" | null;

export default function CustomersClient() {
  const { customers, loading, error, addCustomer, updateCustomer, deleteCustomer } =
    useCustomers();
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<
    ReturnType<typeof useCustomers>["customers"][0] | undefined
  >(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.business.toLowerCase().includes(query) ||
        c.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [customers, search]);

  const openAdd = () => {
    setSelectedCustomer(undefined);
    setModalMode("add");
    setActionError(null);
  };

  const openEdit = (customer: ReturnType<typeof useCustomers>["customers"][0]) => {
    setSelectedCustomer(customer);
    setModalMode("edit");
    setActionError(null);
  };

  const openDelete = (id: string) => {
    setDeleteId(id);
    setModalMode("delete");
    setActionError(null);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedCustomer(undefined);
    setDeleteId(null);
    setActionError(null);
  };

  const handleAdd = async (data: Omit<ReturnType<typeof useCustomers>["customers"][0], "id">) => {
    setSaving(true);
    setActionError(null);
    try {
      await addCustomer(data);
      closeModal();
    } catch {
      setActionError("Something went wrong while adding the customer.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (data: Omit<ReturnType<typeof useCustomers>["customers"][0], "id">) => {
    if (!selectedCustomer) return;
    setSaving(true);
    setActionError(null);
    try {
      await updateCustomer(selectedCustomer.id, data);
      closeModal();
    } catch {
      setActionError("Something went wrong while updating the customer.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSaving(true);
    setActionError(null);
    try {
      await deleteCustomer(deleteId);
      closeModal();
    } catch {
      setActionError("Something went wrong while deleting the customer.");
    } finally {
      setSaving(false);
    }
  };

  const isLoading = loading || saving;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Customers</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {customers.length} customers · Rs{" "}
            {customers.reduce((sum, c) => sum + c.outstanding, 0).toLocaleString()}{" "}
            outstanding
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="#" variant="secondary" size="sm">
            Export
          </Button>
          <Button onClick={openAdd} size="sm">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-danger bg-danger-light">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
            <div>
              <p className="font-semibold text-danger">Unable to load customers</p>
              <p className="mt-1 text-sm text-danger">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {actionError && (
        <Card className="border-danger bg-danger-light">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
            <div className="flex-1">
              <p className="font-semibold text-danger">Action failed</p>
              <p className="mt-1 text-sm text-danger">{actionError}</p>
            </div>
            <button
              type="button"
              onClick={() => setActionError(null)}
              className="rounded-md p-1 text-danger hover:bg-danger/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          name="search"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-white py-2.5 pl-9 pr-4 text-sm placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {isLoading && customers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm font-semibold text-ink-soft">Loading customers...</p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-gray-100">
            <Search className="h-6 w-6 text-ink-faint" />
          </div>
          <p className="mt-4 text-lg font-extrabold text-ink">No customers found</p>
          <p className="mt-1 text-sm text-ink-soft">
            {search
              ? "Try adjusting your search or add a new customer."
              : "Get started by adding your first customer."}
          </p>
          {!search && (
            <Button onClick={openAdd} className="mt-4">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          )}
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block">
            <Card className="p-0">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Phone</TableHeaderCell>
                    <TableHeaderCell>Business</TableHeaderCell>
                    <TableHeaderCell align="right">Outstanding</TableHeaderCell>
                    <TableHeaderCell align="right">Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-primary-light text-sm font-bold text-primary-dark">
                            {customer.name
                              .split(" ")
                              .map((part) => part.charAt(0))
                              .slice(0, 2)
                              .join("")}
                          </span>
                          <div>
                            <p className="font-bold text-ink">{customer.name}</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {customer.tags?.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="primary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                          <Phone className="h-3.5 w-3.5" />
                          {customer.phone}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-ink-soft">
                        {customer.business}
                      </TableCell>
                      <TableCell align="right" className="font-extrabold text-ink">
                        {formatCurrency(customer.outstanding)}
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(customer)}
                            aria-label={`Edit ${customer.name}`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDelete(customer.id)}
                            aria-label={`Delete ${customer.name}`}
                            className="text-danger hover:text-danger"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 md:hidden">
            {filtered.map((customer) => (
              <Card key={customer.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-primary-light text-sm font-bold text-primary-dark">
                      {customer.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <p className="font-extrabold text-ink">{customer.name}</p>
                      <p className="text-xs text-ink-faint">{customer.business}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(customer)}
                      aria-label={`Edit ${customer.name}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDelete(customer.id)}
                      aria-label={`Delete ${customer.name}`}
                      className="text-danger hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t-2 border-gray-100 pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
                      <Phone className="h-3.5 w-3.5" />
                      {customer.phone}
                    </span>
                    {customer.tags?.map((tag) => (
                      <Badge key={tag} variant="primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm font-extrabold text-ink">
                    {formatCurrency(customer.outstanding)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalMode === "add" || modalMode === "edit"} onClose={closeModal} title={modalMode === "edit" ? "Edit Customer" : "Add Customer"}>
        <CustomerForm
          customer={selectedCustomer}
          onSubmit={modalMode === "edit" ? handleEdit : handleAdd}
          onCancel={closeModal}
          submitLabel={modalMode === "edit" ? "Update Customer" : "Save Customer"}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={modalMode === "delete"} onClose={closeModal} title="Delete Customer">
        <div className="space-y-4">
          <p className="text-sm text-ink-soft">
            Are you sure you want to delete this customer? This action cannot be undone.
          </p>
          {actionError && (
            <p className="text-xs font-semibold text-danger">{actionError}</p>
          )}
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={closeModal} disabled={saving}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
