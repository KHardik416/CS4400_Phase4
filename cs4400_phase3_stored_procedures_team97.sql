-- CS4400: Introduction to Database Systems (Fall 2024)
-- Project Phase III: Stored Procedures SHELL [v3] Thursday, Nov 7, 2024
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;
use business_supply;
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure
to
be executed is false, then simply have the procedure halt execution without
changing
the database state. Do NOT display any error messages, etc. */


-- [1] add_owner()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new owner. A new owner must have a unique
username. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_owner;
delimiter //
create procedure add_owner (
	in ip_username varchar(40),
    in ip_first_name varchar(100),
    in ip_last_name varchar(100),
    in ip_address varchar(500),
    in ip_birthdate date
    )
    
sp_main: begin
	IF ip_username IS NULL OR ip_first_name IS NULL OR ip_last_name IS NULL OR ip_address IS NULL OR ip_birthdate IS NULL THEN
		leave sp_main;
	END IF;
    
	-- ensure new owner has a unique username
    if ip_username in (select username from users) then leave sp_main; end if;
    insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
    insert into business_owners values (ip_username);

end //
delimiter ;


-- [2] add_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new employees without any designated drivers or
worker roles. A new employees must have a unique username and a unique tax
identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_employee;
delimiter //
create procedure add_employee (
	in ip_username varchar(40),
    in ip_first_name varchar(100),
    in ip_last_name varchar(100),
    in ip_address varchar(500),
    in ip_birthdate date,
    in ip_taxID varchar(40),
    in ip_hired date,
    in ip_employee_experience integer,
    in ip_salary integer
    )
    
sp_main: begin
	IF ip_username IS NULL OR ip_first_name IS NULL OR ip_last_name IS NULL OR ip_address IS NULL OR ip_birthdate IS NULL 
    OR ip_taxID IS NULL OR ip_hired IS NULL OR ip_employee_experience IS NULL OR ip_salary IS NULL THEN
        LEAVE sp_main;
    END IF;
    
-- ensure new owner has a unique username
-- ensure new employees has a unique tax identifier
    if ip_username in (select username from users) then leave sp_main; end if;
    if ip_taxID in (select taxID from employees) then leave sp_main; end if;
    insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
    insert into employees values(ip_username, ip_taxID, ip_hired, ip_employee_experience, ip_salary);
end //
delimiter ;


-- [3] add_driver_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the drivers role to an existing employee. The
employee/new drivers must have a unique license identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_driver_role;
delimiter //
create procedure add_driver_role (
	in ip_username varchar(40),
    in ip_licenseID varchar(40),
    in ip_license_type varchar(40),
    in ip_driver_experience integer
    )
    
sp_main: begin
	if ip_username is NULL or ip_licenseID is NULL or ip_license_type is NULL or ip_driver_experience is NULL then
	leave sp_main; 
    end if;
    
-- ensure employees exists and is not a worker
-- ensure new drivers has a unique license identifier
    
    if ip_username not in (select username from employees) or ip_username in (select username from workers) then leave sp_main; end if;    
    if ip_licenseID in (select licenseID from drivers) then leave sp_main; end if;
    
    insert into drivers values(ip_username, ip_licenseID, ip_license_type, ip_driver_experience);	
end //
delimiter ;



-- [4] add_worker_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the worker role to an existing employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_worker_role;
delimiter //
create procedure add_worker_role (in ip_username varchar(40))
sp_main: begin
	if ip_username is NULL then
	leave sp_main; 
    end if;
    
-- ensure employees exists and is not a driver    
    if ip_username not in (select username from employees) or ip_username in (select username from drivers) then leave sp_main; end if;    
    
    insert into workers values(ip_username);
end //
delimiter ;


-- [5] add_product()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new product. A new product must have a
unique barcode. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_product;
delimiter //
create procedure add_product (
	in ip_barcode varchar(40),
	in ip_name varchar(100),
	in ip_weight integer
	)
sp_main: begin
	if ip_barcode is NULL or ip_name is NULL or ip_weight is NULL then
	leave sp_main; 
    end if;
    
-- ensure new product doesn't already exist
	if ip_barcode in (select barcode from products) then leave sp_main; end if;
    
    insert into products values(ip_barcode, ip_name, ip_weight);
    
end //
delimiter ;


-- [6] add_van()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new van. A new van must be assigned
to a valid delivery service and must have a unique tag. Also, it must be driven
by a valid drivers initially (i.e., drivers works for the same service). And the
van's starting
location will always be the delivery service's home base by default. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_van;
delimiter //
create procedure add_van (
	in ip_id varchar(40),
	in ip_tag integer,
	in ip_fuel integer,
	in ip_capacity integer,
	in ip_sales integer,
	in ip_driven_by varchar(40)
	)
sp_main: begin
    declare homebase varchar(40);
    
    if ip_id is NULL or ip_tag is NULL or ip_fuel is NULL or ip_capacity is NULL or ip_sales is NULL then leave sp_main; 
    end if;
    
-- ensure new van doesn't already exist
	if ip_tag in (select tag from vans) and ip_id in (select id from vans where ip_tag = tag) then leave sp_main; end if;
-- ensure that the delivery service exists
	if ip_id not in (select id from delivery_services) then leave sp_main; end if;
-- ensure that a valid drivers will control the van
	if ip_driven_by like "" then set ip_driven_by = null; end if;
	if ip_driven_by not in (select username from drivers) then
    select 'invalid driver'; leave sp_main; end if;
    
    select home_base into homebase
    from delivery_services
    where ip_id = id;
    
    insert into vans values(ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_driven_by, homebase);
    select 'inserted successfully';
    
end //
delimiter ;



-- [7] add_business()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new business. A new business must have a
unique (long) name and must exist at a valid location, and have a valid rating.
And a resturant is initially "independent" (i.e., no owner), but will be assigned
an owner later for funding purposes. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_business;
delimiter //
create procedure add_business (
	in ip_long_name varchar(40),
    in ip_rating integer,
    in ip_spent integer,
    in ip_location varchar(40)
    )
sp_main: begin
if ip_long_name is NULL or ip_rating is NULL or ip_spent is NULL or ip_location is NULL then
	leave sp_main; 
    end if;

-- ensure new business doesn't already exist
if ip_long_name in (select long_name from businesses) then leave sp_main; end if;
-- ensure that the location is valid
if ip_location not in (select label from locations) then leave sp_main; end if;
-- ensure that the rating is valid (i.e., between 1 and 5 inclusively)
if ip_rating not between 1 and 5 then leave sp_main; end if;

insert into businesses values(ip_long_name, ip_rating, ip_spent, ip_location);
end //
delimiter ;


-- [8] add_service()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new delivery service. A new service must have
a unique identifier, along with a valid home base and manager. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_service;
delimiter //
create procedure add_service (
	in ip_id varchar(40),
	in ip_long_name varchar(100),
    in ip_home_base varchar(40),
    in ip_manager varchar(40)
    )
sp_main: begin
if ip_id is NULL or ip_long_name is NULL or ip_home_base is NULL then
	leave sp_main; 
    end if;

-- ensure new delivery service doesn't already exist
if ip_id in (select id from delivery_services) then leave sp_main; end if;
-- ensure that the home base location is valid
if ip_home_base in (select home_base from delivery_services) then leave sp_main; end if;
-- ensure that the manager is valid
if ip_manager like "" then set ip_manager = null; end if;
if ip_manager not in (select username from workers) or ip_manager in (select manager from delivery_services) then leave sp_main; end if;

insert into delivery_services values(ip_id, ip_long_name, ip_home_base, ip_manager);
end //
delimiter ;


-- [9] add_location()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new location that becomes a new valid van
destination. A new location must have a unique combination of coordinates. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_location;
delimiter //
create procedure add_location (
	in ip_label varchar(40),
    in ip_x_coord integer,
    in ip_y_coord integer,
    in ip_space integer
    )
sp_main: begin
if ip_label is NULL or ip_x_coord is NULL or ip_y_coord is NULL then
	leave sp_main; 
    end if;
    
-- ensure new location doesn't already exist
if ip_label in (select label from locations) then leave sp_main; end if;
-- ensure that the coordinate combination is distinct
if ip_x_coord in (select x_coord from locations where ip_y_coord = y_coord) then leave sp_main; end if;
if ip_space like "" then set ip_space = null; end if;

insert into locations values(ip_label, ip_x_coord, ip_y_coord, ip_space);
end //
delimiter ;


-- [10] start_funding()
-- -----------------------------------------------------------------------------
/* This stored procedure opens a channel for a business owner to provide funds
to a business. The owner and business must be valid. */
-- -----------------------------------------------------------------------------
drop procedure if exists start_funding;
delimiter //
create procedure start_funding (
	in ip_owner varchar(40),
	in ip_amount integer,
	in ip_long_name varchar(40),
	in ip_fund_date date
	)
sp_main: begin
if ip_owner is NULL or ip_long_name is NULL or ip_fund_date is NULL then
	leave sp_main; 
    end if;
    
-- ensure the owner and business are valid
if ip_owner not in (select username from business_owners) then leave sp_main; end if;
if ip_long_name not in (select long_name from businesses) then leave sp_main; end if;

insert into fund values(ip_owner, ip_amount, ip_fund_date, ip_long_name);
end //
delimiter ;


-- [11] hire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure hires a worker to work for a delivery service.
If a worker is actively serving as manager for a different service, then they are
not eligible to be hired. Otherwise, the hiring is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists hire_employee;
delimiter //
create procedure hire_employee (
	in ip_username varchar(40),
	in ip_id varchar(40)
	)
sp_main: begin
if ip_username is NULL or ip_id  is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the employee hasn't already been hired by that service
if ip_username in (select username from work_for where ip_id = id) then leave sp_main; end if;
-- ensure that the employee and delivery service are valid
if ip_username not in (select username from employees) or ip_id not in (select id from delivery_services) then leave sp_main; end if;
-- ensure that the employee isn't a manager for another service
if ip_username in (select manager from delivery_services) then leave sp_main; end if;

insert into work_for values(ip_username, ip_id);
end //
delimiter ;



-- [12] fire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure fires a worker who is currently working for a delivery
service. The only restriction is that the employees must not be serving as a
manager for the service. Otherwise, the firing is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists fire_employee;
delimiter //
create procedure fire_employee (
	in ip_username varchar(40),
	in ip_id varchar(40)
	)
sp_main: begin
if ip_username is NULL or ip_id  is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the employee is currently working for the service
if ip_username not in (select username from work_for where ip_id = id) then leave sp_main; end if;
-- ensure that the employee isn't an active manager
if ip_username in (select manager from delivery_services where ip_id = id) then leave sp_main; end if;

delete from work_for where username = ip_username and id = ip_id;
end //
delimiter ;



-- [13] manage_service()
-- -----------------------------------------------------------------------------
/* This stored procedure appoints a worker who is currently hired by a delivery
service as the new manager for that service. The only restrictions is that
the worker must not be working for any other delivery service. Otherwise, the
appointment to manager is permitted. The current manager is simply replaced. */
-- -----------------------------------------------------------------------------
drop procedure if exists manage_service;
delimiter //
create procedure manage_service (
	in ip_username varchar(40),
	in ip_id varchar(40)
	)
sp_main: begin
if ip_username is NULL or ip_id  is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the employee is currently working for the service
if ip_username not in (select username from work_for where ip_id = id) then leave sp_main; end if;
-- ensure that the employee isn't working for any other services
if ip_username in (select username from work_for where ip_id != id) then leave sp_main; end if;

update delivery_services
set manager = ip_username
where id = ip_id;

end //
delimiter ;



-- [14] takeover_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a valid drivers to take control of a van owned by
the same delivery service. The current controller of the van is simply relieved
of those duties. */
-- -----------------------------------------------------------------------------
drop procedure if exists takeover_van;
delimiter //
create procedure takeover_van (
	in ip_username varchar(40),
	in ip_id varchar(40),
	in ip_tag integer
	)
sp_main: begin
if ip_id is NULL or ip_tag is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the drivers is not driving for another service
if ip_username in (select username from work_for where id != ip_id) then leave sp_main; end if;
-- ensure that the selected van is owned by the same service
if ip_tag not in (select tag from vans where ip_id = id) then leave sp_main; end if;
-- ensure that the employees is a valid driver
if ip_username like "" then set ip_username = null; end if;
if ip_username not in (select username from drivers) then leave sp_main; end if;

update vans
set driven_by = ip_username
where id = ip_id and tag = ip_tag;
end //
delimiter ;



-- [15] load_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add some quantity of fixed-size packages of
a specific product to a van's payload so that we can sell them for some
specific price to other businesses. The van can only be loaded if it's located
at its delivery service's home base, and the van must have enough capacity to
carry the increased number of items.
The change/delta quantity value must be positive, and must be added to the quantity
of the product already loaded onto the van as applicable. And if the product
already exists on the van, then the existing price must not be changed. */
-- -----------------------------------------------------------------------------
drop procedure if exists load_van;
delimiter //
create procedure load_van (
	in ip_id varchar(40),
	in ip_tag integer,
	in ip_barcode varchar(40),
	in ip_more_packages integer,
	in ip_price integer
	)
sp_main: begin
declare van_location varchar(40);
declare van_capacity integer;

if ip_barcode is NULL or ip_id is NULL or ip_tag is NULL or ip_price is NULL or ip_more_packages is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the van being loaded is owned by the service
if ip_tag not in (select tag from vans where id = ip_id) then leave sp_main; end if;
-- ensure that the product is valid
if ip_barcode not in (select barcode from products) then leave sp_main; end if;
-- ensure that the van is located at the service home base
select located_at into van_location from vans
where ip_tag = tag and ip_id = id;
if van_location not in (select home_base from delivery_services) then leave sp_main; end if;
-- ensure that the quantity of new packages is greater than zero
if ip_more_packages <= 0 then leave sp_main; end if;
-- ensure that the van has sufficient capacity to carry the new packages
select capacity into van_capacity from vans
where ip_tag = tag and ip_id = id;
if ip_more_packages > van_capacity then leave sp_main; end if;
-- add more of the product to the van
if ip_barcode in (select barcode from contain where ip_id = id and ip_tag = tag) then
	update contain
    set quantity = quantity + ip_more_packages
    where ip_id = id and ip_tag = tag and ip_barcode = barcode;
else if ip_price > 0 then
	insert into contain value(ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price);
    end if;
end if;
    
end //
delimiter ;



-- [16] refuel_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add more fuel to a van. The van can only
be refueled if it's located at the delivery service's home base. */
-- -----------------------------------------------------------------------------
drop procedure if exists refuel_van;
delimiter //
create procedure refuel_van (
	in ip_id varchar(40),
	in ip_tag integer,
	in ip_more_fuel integer
	)
sp_main: begin
declare van_location varchar(40);
if ip_more_fuel is NULL or ip_id  is NULL or ip_tag is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the van being switched is valid and owned by the service
if ip_tag not in (select tag from vans where ip_id = id) then leave sp_main; end if;
-- ensure that the van is located at the service home base
select located_at into van_location from vans
where ip_tag = tag and ip_id = id;
if van_location not in (select home_base from delivery_services) then leave sp_main; end if;

update vans
set fuel = fuel + ip_more_fuel
where ip_id = id and ip_tag = tag;
end //
delimiter ;


-- [17] drive_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to move a single van to a new
location (i.e., destination). This will also update the respective driver's
experience and van's fuel. The main constraints on the van(s) being able to
move to a new location are fuel and space. A van can only move to a destination
if it has enough fuel to reach the destination and still move from the destination
back to home base. And a van can only move to a destination if there's enough
space remaining at the destination. */
-- -----------------------------------------------------------------------------
drop function if exists fuel_required;
delimiter //
create function fuel_required (ip_departure varchar(40), ip_arrival varchar(40))
returns integer reads sql data
begin
if (ip_departure = ip_arrival) then return 0;
else return (select 1 + truncate(sqrt(power(arrival.x_coord -
departure.x_coord, 2) + power(arrival.y_coord - departure.y_coord, 2)), 0) as fuel
from (select x_coord, y_coord from locations where label =
ip_departure) as departure,
(select x_coord, y_coord from locations where label = ip_arrival) as
arrival);
end if;
end //
delimiter ;
drop procedure if exists drive_van;
delimiter //
create procedure drive_van (
	in ip_id varchar(40),
	in ip_tag integer,
	in ip_destination varchar(40)
	)
sp_main: begin
declare van_location varchar(40);
declare van_hb varchar(40);
declare van_fuel integer;
declare required_fuel integer;

if ip_id is null or ip_tag is null or ip_destination is null then leave sp_main; end if;

-- ensure that the destination is a valid location
if ip_destination not in (select label from locations) then leave sp_main; end if;

-- ensure that the van isn't already at the location
select located_at into van_location from vans
where ip_tag = tag and ip_id = id;
if ip_destination = van_location then leave sp_main; end if;

-- ensure that the van has enough fuel to reach the destination and (then) homebase
select fuel into van_fuel from vans
where ip_tag = tag and ip_id = id;
select home_base into van_hb from delivery_services
where ip_id = id;
set required_fuel = fuel_required(van_location, ip_destination) + fuel_required(ip_destination, van_hb);
if van_fuel < required_fuel then leave sp_main; end if;
-- ensure that the van has enough space at the destination for the trip
if (select space from locations where label = ip_destination) <= 0 then leave sp_main; end if;

update vans
set located_at = ip_destination, fuel = fuel - fuel_required(van_location, ip_destination)
where ip_id = id and ip_tag = tag;

update drivers
set successful_trips = successful_trips + 1
where username in (select driven_by from vans where ip_id = id and ip_tag = tag);
end //
delimiter ;


-- [18] purchase_product()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a business to purchase products from a van
at its current location. The van must have the desired quantity of the product
being purchased. And the business must have enough money to purchase the
products. If the transaction is otherwise valid, then the van and business
information must be changed appropriately. Finally, we need to ensure that all
quantities in the payload table (post transaction) are greater than zero. */
-- -----------------------------------------------------------------------------
drop procedure if exists purchase_product;
delimiter //
create procedure purchase_product (
	in ip_long_name varchar(40), 
    in ip_id varchar(40),
    in ip_tag integer, 
    in ip_barcode varchar(40), 
    in ip_quantity integer)
sp_main: begin
	declare van_loc varchar(40);
    declare num_items int;
    declare item_cost int;
    
    if ip_long_name is NULL or ip_id is NULL or ip_tag is NULL or ip_barcode is NULL or ip_quantity is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the business is valid
if ip_long_name not in (select long_name from businesses) then leave sp_main; end if;

-- ensure that the van is valid and exists at the business's location
if ip_id not in (select id from vans where ip_id = id and ip_tag = tag) then leave sp_main; end if;

select located_at into van_loc 
from vans
where id = ip_id and tag = ip_tag;
if ip_long_name not in (select long_name from businesses where location = van_loc) then leave sp_main; end if;

-- ensure that the van has enough of the requested product
select quantity, price into num_items, item_cost 
from contain
where id = ip_id and tag = ip_tag and barcode = ip_barcode;
select coalesce(num_items, 0) into num_items;
select coalesce(item_cost, 0) into item_cost;

if ip_quantity > num_items then leave sp_main; end if;

-- update the van's payload
update contain
set quantity = quantity - ip_quantity
where id = ip_id and tag = ip_tag and barcode = ip_barcode;
-- update the monies spent and gained for the van and business
update vans
set sales = sales + (item_cost * ip_quantity)
where id = ip_id and tag = ip_tag;

update businesses
set spent = spent + (item_cost * ip_quantity)
where long_name = ip_long_name;
-- ensure all quantities in the contain table are greater than zero
delete from contain
where quantity = 0;
end //
delimiter ;

-- [19] remove_product()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a product from the system. The removal can
occur if, and only if, the product is not being carried by any vans. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_product;
delimiter //
create procedure remove_product (in ip_barcode varchar(40))
sp_main: begin
if ip_barcode is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the product exists
if ip_barcode not in (select barcode from products) then leave sp_main; end if;

-- ensure that the product is not being carried by any vans
if ip_barcode in (select barcode from contain) then leave sp_main; end if;

delete from products
where barcode = ip_barcode;

end //
delimiter ;


-- [20] remove_van()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a van from the system. The removal can
occur if, and only if, the van is not carrying any products.*/
-- -----------------------------------------------------------------------------
drop procedure if exists remove_van;
delimiter //
create procedure remove_van (in ip_id varchar(40), in ip_tag integer)
sp_main: begin
if ip_id is NULL or ip_tag is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the van exists
if ip_id not in (select id from vans where ip_id = id and ip_tag = tag) then leave sp_main; end if;

-- ensure that the van is not carrying any products
if ip_id in (select id from contain where id = ip_id and tag = ip_tag) then leave sp_main; end if;

delete from vans
where id = ip_id and tag = ip_tag;

end //
delimiter ;


-- [21] remove_driver_role()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a drivers from the system. The removal can
occur if, and only if, the drivers is not controlling any vans.
The driver's information must be completely removed from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_driver_role;
delimiter //
create procedure remove_driver_role (in ip_username varchar(40))
sp_main: begin
if ip_username is NULL then
	leave sp_main; 
    end if;
    
-- ensure that the drivers exists
if ip_username not in (select username from drivers) then leave sp_main; end if;

-- ensure that the drivers is not controlling any vans
if ip_username in (select driven_by from vans) then leave sp_main; end if;

-- remove all remaining information
delete from users
where username = ip_username;

end //
delimiter ;


-- [22] display_owner_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an owner.
For each owner, it includes the owner's information, along with the number of
businesses for which they provide funds and the number of different places where
those businesses are located. It also includes the highest and lowest ratings
for each of those businesses, as well as the total amount of debt based on the
monies spent purchasing products by all of those businesses. And if an owner
doesn't fund any businesses then display zeros for the highs, lows and debt. */
-- -----------------------------------------------------------------------------
create or replace view display_owner_view as
select 
	bo.username, 
    u.first_name, 
    u.last_name, 
    u.address, 
    count(f.username) as num_buisnesses, 
    count(b.location) as num_places,
    coalesce(max(b.rating), 0) as highs,
    coalesce(min(b.rating), 0) as lows,
    coalesce(sum(b.spent), 0) as debt
from business_owners bo
left join users u on u.username = bo.username
left join fund f on f.username = bo.username
left join businesses b on b.long_name = f.business
group by bo.username, u.first_name, u.last_name;


-- [23] display_employee_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an
employee.
For each employee, it includes the username, tax identifier, salary, hiring date
and
experience level, along with license identifer and driving experience (if
applicable,
'n/a' if not), and a 'yes' or 'no' depending on the manager status of the employee.
*/
-- -----------------------------------------------------------------------------
create or replace view display_employee_view as
select 
	e.username, 
    e.taxID, 
    e.salary, 
    e.hired, 
    e.experience,
    coalesce(licenseID, 'n/a') as licenseID,
    coalesce(successful_trips, 'n/a') as driving_experience,
    case
		when ds.manager = e.username then 'yes'
        else 'no'
	end as manager_status
from employees e
left join drivers d on e.username = d.username
left join delivery_services ds on ds.manager = e.username;


-- [24] display_driver_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a driver.
For each driver, it includes the username, licenseID and drivering experience,
along
with the number of vans that they are controlling. */
-- -----------------------------------------------------------------------------
create or replace view display_driver_view as
select d.username, d.licenseID, d.successful_trips, count(v.driven_by) as num_vans
from drivers d
left join vans v on v.driven_by = d.username
group by d.username;


-- [25] display_location_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a location.
For each location, it includes the label, x- and y- coordinates, along with the
name of the business or service at that location, the number of vans as well as
the identifiers of the vans at the location (sorted by the tag), and both the
total and remaining capacity at the location. */
-- -----------------------------------------------------------------------------
create or replace view display_location_view as
select 
	l.label, 
    coalesce(b.long_name, d.long_name) as long_name,
    l.x_coord, 
    l.y_coord,
    l.space,
	count(v.id) as num_vans,
	group_concat(concat(v.id, v.tag) order by v.tag separator ', ') as van_ids,
	l.space - count(v.id) as remaining_capacity
from locations l
left join delivery_services d ON d.home_base = l.label
left join businesses b on b.location = l.label
join vans v on v.located_at = l.label
group by l.label, long_name;


-- [26] display_product_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of the
products.
For each product that is being carried by at least one van, it includes a list of
the various locations where it can be purchased, along with the total number of
packages
that can be purchased and the lowest and highest prices at which the product is
being
sold at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_product_view as
select 
	p.iname as product_name, 
    v.located_at as location, 
    c.quantity as amount_available,
    coalesce(min(price), 0) as low_price,
    coalesce(max(price), 0) as high_price
from products p
join contain c on c.barcode = p.barcode
join vans v on v.id = c.id and v.tag = c.tag
group by p.iname, v.located_at, c.quantity;


-- [27] display_service_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a delivery
service. It includes the identifier, name, home base location and manager for the
service, along with the total sales from the vans. It must also include the number
of unique products along with the total cost and weight of those products being
carried by the vans. */
-- -----------------------------------------------------------------------------
create or replace view display_service_view as
select
	ds.id, 
	ds.long_name, 
    ds.home_base, 
    ds.manager, 
    sum(v.sales) as revenue,
    temp.products_carried,
    temp.cost_carried,
    temp.weight_carried
from delivery_services ds
left join vans v on v.id = ds.id
left join (
	select id,
    count(distinct c.barcode) as products_carried,
    sum(c.quantity * c.price) as cost_carried,
    sum(c.quantity * p.weight) as weight_carried
    from contain c
    left join products p on c.barcode = p.barcode
    group by c.id) as temp
    on temp.id = ds.id
group by ds.id;