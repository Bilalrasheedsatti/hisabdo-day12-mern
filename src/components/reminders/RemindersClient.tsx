"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ReminderForm from "@/components/reminders/ReminderForm";
import { Select } from "@/components/ui/Input";
import { useReminders } from "@/context/ReminderContext";
import { useCustomers } from "@/context/CustomerContext";
import { formatCurrency } from "@/lib/data";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MessageCircle,
  Smartphone,
  Clock,
  Send,
  CheckCircle2,
  XCircle,
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
import type { Reminder, ReminderStatus } from "@/types";
import type { LucideIcon } from "lucide-react";

type ModalMode = "add" | "edit" | "delete" | null;

interface StatusConfig {
  label: string;
  variant: "neutral" | "accent" | "warn" | "danger" | "primary";
  icon: LucideIcon;
}

const statusConfig: Record<ReminderStatus, StatusConfig> = {
  draft: { label: "Draft", variant: "neutral", icon: Clock },
  scheduled: { label: "Scheduled", variant: "warn", icon: Clock },
  sent: { label: "Sent", variant: "primary", icon: Send },
  delivered: { label: "Delivered", variant: "accent", icon: CheckCircle2 },
  failed: { label: "Failed", variant: "danger", icon: XCircle },
};

const methodConfig: Record<string, { label: string; icon: LucideIcon }> = {
  sms: { label: "SMS", icon: Smartphone },
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
};

export default function RemindersClient() {
  const { reminders, loading, error, addReminder, updateReminder, deleteReminder } =
    useReminders();
  const { customers } = useCustomers();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReminderStatus | "all">("all");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | undefined>(
    undefined,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const customerName = (id: string) =>
    customers.find((c) => c.id === id)?.name ?? "Unknown customer";

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return reminders.filter((r) => {
      const name = customers.find((c) => c.id === r.customerId)?.name ?? "";
      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        r.note.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reminders, search, statusFilter, customers]);

  const openAdd = () => {
    setSelectedReminder(undefined);
    setModalMode("add");
    setActionError(null);
  };

  const openEdit = (reminder: Reminder) => {
    setSelectedReminder(reminder);
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
    setSelectedReminder(undefined);
    setDeleteId(null);
    setActionError(null);
  };

  const handleAdd = async (data: Omit<Reminder, "id">) => {
    setSaving(true);
    setActionError(null);
    try {
      await addReminder(data);
      closeModal();
    } catch {
      setActionError("Something went wrong while adding the reminder.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (data: Omit<Reminder, "id">) => {
    if (!selectedReminder) return;
    setSaving(true);
    setActionError(null);
    try {
      await updateReminder(selectedReminder.id, data);
      closeModal();
    } catch {
      setActionError("Something went wrong while updating the reminder.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSaving(true);
    setActionError(null);
    try {
      await deleteReminder(deleteId);
      closeModal();
    } catch {
      setActionError("Something went wrong while deleting the reminder.");
    } finally {
      setSaving(false);
    }
  };

  const isLoading = loading || saving;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Reminders</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {reminders.length} reminders · Recover dues with SMS & WhatsApp.
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="#" variant="secondary" size="sm">
            Send Bulk
          </Button>
          <Button onClick={openAdd} size="sm">
            <Plus className="h-4 w-4" />
            Add Reminder
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-danger bg-danger-light">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
            <div>
              <p className="font-semibold text-danger">Unable to load reminders</p>
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

      {/* Toolbar: search + status filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            name="search"
            placeholder="Search by customer or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border-2 border-ink bg-white py-2.5 pl-9 pr-4 text-sm placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <Select
          label="Status"
          name="status"
          className="sm:ml-auto sm:w-44"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as typeof statusFilter)
          }
        >
          <option value="all">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </Select>
      </div>

      {isLoading && reminders.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm font-semibold text-ink-soft">
            Loading reminders...
          </p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-gray-100">
            <Search className="h-6 w-6 text-ink-faint" />
          </div>
          <p className="mt-4 text-lg font-extrabold text-ink">
            No reminders found
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {search || statusFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Get started by adding your first reminder."}
          </p>
          {!search && statusFilter === "all" && (
            <Button onClick={openAdd} className="mt-4">
              <Plus className="h-4 w-4" />
              Add Reminder
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
                    <TableHeaderCell>Customer</TableHeaderCell>
                    <TableHeaderCell align="right">Amount</TableHeaderCell>
                    <TableHeaderCell>Method</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Scheduled</TableHeaderCell>
                    <TableHeaderCell align="right">Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((reminder) => {
                    const status = statusConfig[reminder.status];
                    const method = methodConfig[reminder.method];
                    const StatusIcon = status.icon;
                    const MethodIcon = method.icon;
                    return (
                      <TableRow key={reminder.id}>
                        <TableCell className="font-medium text-ink">
                          {customerName(reminder.customerId)}
                        </TableCell>
                        <TableCell align="right" className="font-extrabold">
                          {formatCurrency(reminder.amount)}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                            <MethodIcon className="h-3.5 w-3.5" />
                            {method.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-ink-soft">
                          {reminder.scheduledDate}
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(reminder)}
                              aria-label={`Edit reminder for ${customerName(reminder.customerId)}`}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDelete(reminder.id)}
                              aria-label={`Delete reminder for ${customerName(reminder.customerId)}`}
                              className="text-danger hover:text-danger"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 md:hidden">
            {filtered.map((reminder) => {
              const status = statusConfig[reminder.status];
              const method = methodConfig[reminder.method];
              const StatusIcon = status.icon;
              const MethodIcon = method.icon;
              return (
                <Card key={reminder.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-extrabold text-ink">
                        {customerName(reminder.customerId)}
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {formatCurrency(reminder.amount)} ·{" "}
                        <span className="inline-flex items-center gap-1">
                          <MethodIcon className="h-3.5 w-3.5" />
                          {method.label}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-ink-faint">
                        {reminder.scheduledDate}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={status.variant}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {status.label}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(reminder)}
                          aria-label={`Edit reminder for ${customerName(reminder.customerId)}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDelete(reminder.id)}
                          aria-label={`Delete reminder for ${customerName(reminder.customerId)}`}
                          className="text-danger hover:text-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalMode === "add" || modalMode === "edit"}
        onClose={closeModal}
        title={modalMode === "edit" ? "Edit Reminder" : "Add Reminder"}
      >
        <ReminderForm
          reminder={selectedReminder}
          onSubmit={modalMode === "edit" ? handleEdit : handleAdd}
          onCancel={closeModal}
          submitLabel={modalMode === "edit" ? "Update Reminder" : "Save Reminder"}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={modalMode === "delete"} onClose={closeModal} title="Delete Reminder">
        <div className="space-y-4">
          <p className="text-sm text-ink-soft">
            Are you sure you want to delete this reminder? This action cannot
            be undone.
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
