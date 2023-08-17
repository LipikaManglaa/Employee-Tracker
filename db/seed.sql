use employee_db;

INSERT INTO department(name)
VALUES 
('HR'),
('Training'),
("Marketing & Proposals"),
("sales Department"),
("Project Department"),
("Designing Department"),
("Production Department"),
("Maintenance Department"),
("Store Department"),
("Procurement Department"),
("Quality Department"),
("Inspection department"),
("Packaging Department"),
("Finance Department"),
("Account Department"),
("Research & Development"),
("Information Technology"),
("Human Resources");

INSERT INTO role(title, salary, department_id)
VALUES 

('Employment Manager',12000,1),
("Recruitment manager",13000,2),
("Digital Marketing Specialist",15000,3),
("Email Marketing Specialist",1000,3),

("Salesperson",5000,4),
("Business analyst",6000,5),
("Project manager",7000,5),

("Graphic Designer",12000,6),
("User interface design",7000,6),

("Production Designer",10000,7),
("Costume designer",9000,7),

("Maintenance Supervisor",5000,8),
("Maintenance Engineer",10000,8),

("Store manager",7000,9),
("Marketing management",15000,9),

("Head of Procurement",10000,10),
("Procurement Director",12000,10),

("Quality Control Technician",12000,11),
("Quality Engineer",20000,11),

("chief inspector",12000,12),


("Packaging Executive",12200,13),

("Financial Management",6000,14),
("Financial Analyst",7000,14),

("Accountant",22000,11),
("Accounting Clerk",10000,11),

("Research Assistant",23000,16),
("Data science",30000,16),

("Web Developer",10000,17),
("Systems Administrator",12000,17),
('Software Engineer',10000,18),
('Netwrok Engineer',10000,18);


Insert into employee(first_name,last_name,role_id,manager_id)
VALUES
("jyoti","kaur",1,null);

Insert into employee(first_name,last_name,role_id,manager_id)
VALUES
("nehmat","kaur",2,null);

Insert into employee(first_name,last_name,role_id,manager_id)
VALUES
("riha","kaur",3,null);