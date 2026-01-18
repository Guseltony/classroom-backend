import { relations } from "drizzle-orm"
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"


const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
}

// department schema
export const departments = pgTable('departments', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  code: varchar('code', {length: 50}).notNull().unique(),
  name: varchar('name', {length: 225}).notNull(),
  description: varchar('description', { length: 255 }),
  ...timestamps
})

// subject schema
export const subjects = pgTable('subjects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  departmentId: integer('department_id').notNull().references(() => departments.id, {onDelete:"restrict"}),
  name: varchar('name', { length: 225 }).notNull(),
  code: varchar('code', {length: 50}).notNull().unique(),
  description: varchar('description', { length: 255 }),
  ...timestamps
})

// relations
export const departmentRelations = relations(departments, ({ many }) => ({ subjects: many(subjects) }))


export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id]
  })
}))

export type Department = typeof departments.$inferSelect  // this line of code automatically generate types for you base on the data coming from the database

export type NewDepartment = typeof departments.$inferSelect;

export type Subject = typeof subjects.$inferSelect;

export type NewSubject = typeof subjects.$inferSelect;