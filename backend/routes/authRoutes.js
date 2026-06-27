const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// ================= TEST ROUTE =================
router.get("/xyz123", (req, res) => {
    res.send("ROUTE WORKING");
});

// ================= REGISTER PATIENT =================
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, age, gender, password } = req.body;

        const { data, error } = await supabase
            .from("patients")
            .insert([{ name, email, phone, age, gender, password }]);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        return res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            data
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        let tableName = "";

        if (role === "patient") tableName = "patients";
        else if (role === "doctor") tableName = "doctors";
        else if (role === "admin") tableName = "admins";
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq("email", email)
            .eq("password", password)
            .maybeSingle();

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        if (!data) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: data
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

// ================= ADD DOCTOR =================
router.post("/add-doctor", async (req, res) => {
    try {
        const { name, email, phone, specialization, password } = req.body;

        const { data, error } = await supabase
            .from("doctors")
            .insert([{ name, email, phone, specialization, password }]);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        return res.status(201).json({
            success: true,
            message: "Doctor Added Successfully",
            data
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

// ================= GET ALL DOCTORS =================
router.get("/doctors", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("doctors")
            .select("*");

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
router.delete("/doctors/:id", async (req, res) => {


console.log("DELETE ROUTE HIT");
console.log("ID:", req.params.id);

try {

    const { id } = req.params;

    const { error } = await supabase
        .from("doctors")
        .delete()
        .eq("id", id);

    console.log("DELETE ERROR:", error);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    return res.status(200).json({
        success: true,
        message: "Doctor deleted successfully"
    });

} catch (err) {

    console.log("CATCH ERROR:", err);

    return res.status(500).json({
        success: false,
        message: err.message
    });

}


});

router.get("/doctors/:id", async (req, res) => {


try {

    const { id } = req.params;

    const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", id)
        .single();

    if(error){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }

    return res.json(data);

} catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });

}


});

router.put("/doctors/:id", async (req, res) => {


try {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        specialization
    } = req.body;

    const { error } = await supabase
        .from("doctors")
        .update({
            name,
            email,
            phone,
            specialization
        })
        .eq("id", id);

    if(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }

    return res.status(200).json({
        success:true,
        message:"Doctor Updated Successfully"
    });

} catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });

}


});


router.get("/patients", async (req, res) => {

try {

    const { data, error } = await supabase
        .from("patients")
        .select("*");

    if(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }

    return res.status(200).json(data);

} catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });

}


});

router.get("/patients/:id", async (req, res) => {


try {

    const { id } = req.params;

    const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();

    if(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }

    return res.json(data);

} catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });

}


});

router.put("/patients/:id", async (req, res) => {

try {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        age,
        gender,
        profession,
        height,
        weight,
        blood_group
    } = req.body;

    const { error } = await supabase
        .from("patients")
        .update({
            name,
            email,
            phone,
            age,
            gender,
            profession,
            height,
            weight,
            blood_group
        })
        .eq("id", id);

    if(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }

    return res.status(200).json({
        success:true,
        message:"Patient Updated Successfully"
    });

} catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });

}

});



router.delete("/patients/:id", async (req, res) => {


try {

    const { id } = req.params;

    const { error } = await supabase
        .from("patients")
        .delete()
        .eq("id", id);

    if(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }

    return res.status(200).json({
        success:true,
        message:"Patient Deleted Successfully"
    });

} catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });

}


});


router.post("/book-appointment", async (req, res) => {

    try {

        const {

            patient_name,
            doctor_name,
            appointment_date,
            appointment_time,
            reason

        } = req.body;

        const { data, error } = await supabase
        .from("appointments")
        .insert([{

            patient_name,
            doctor_name,
            appointment_date,
            appointment_time,
            reason

        }]);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.status(201).json({
            success:true,
            message:"Appointment Booked Successfully",
            data
        });

    }

    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

router.get("/appointments", async (req, res) => {

    try {

        const { data, error } = await supabase
        .from("appointments")
        .select("*");

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json(data);

    }

    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

router.put("/appointments/:id", async (req, res) => {

    try{

        const { id } = req.params;

        const updateData = {};

        if(req.body.status !== undefined){

            updateData.status = req.body.status;

        }

        if(req.body.consulted !== undefined){

            updateData.consulted = req.body.consulted;

        }

        const { error } = await supabase
        .from("appointments")
        .update(updateData)
        .eq("id", id);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json({
            success:true,
            message:"Appointment Updated Successfully"
        });

    }

    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

router.get("/appointments/patient/:name", async (req, res) => {

    try {

        const { name } = req.params;

        const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_name", name)
        .order("created_at", { ascending:false });

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json(data);

    }

    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

router.get("/appointments/patient/:patientName", async (req, res) => {

    const { patientName } = req.params;

    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_name", patientName);

    if(error){
        return res.status(400).json(error);
    }

    res.json(data);
});

router.get(
"/appointments/doctor/:doctorName",
async (req, res) => {

    try {

        const { doctorName } = req.params;

        const { data, error } =
        await supabase
        .from("appointments")
        .select("*")
        .eq("doctor_name", doctorName);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json(data);

    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

router.post("/add-prescription", async (req, res) => {

    try {

        const {
            patient_name,
            doctor_name,
            diagnosis,
            medicines,
            notes
        } = req.body;

        const { data, error } =
        await supabase
        .from("prescriptions")
        .insert([
            {
                patient_name,
                doctor_name,
                diagnosis,
                medicines,
                notes
            }
        ]);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.status(201).json({
            success:true,
            message:"Prescription Added Successfully"
        });

    } catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});


router.get(
"/prescriptions/patient/:name",
async (req,res)=>{

    try{

        const { name } = req.params;

        const { data,error } =
        await supabase
        .from("prescriptions")
        .select("*")
        .eq("patient_name", name);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json(data);

    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});
router.post("/add-medical-history", async (req, res) => {

    try {

        const {
            patient_name,
            doctor_name,
            visit_reason,
            diagnosis,
            prescription
        } = req.body;

        const { data, error } =
        await supabase
        .from("medical_history")
        .insert([
            {
                patient_name,
                doctor_name,
                visit_reason,
                diagnosis,
                prescription
            }
        ]);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.status(201).json({
            success:true,
            message:"Medical history added"
        });

    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

router.get(
"/medical-history/:name",
async (req,res)=>{

    try{

        const { name } = req.params;

        const { data,error } =
        await supabase
        .from("medical_history")
        .select("*")
        .eq("patient_name",name)
        .order("visit_date",{
            ascending:false
        });

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json(data);

    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});


router.put("/doctor/:id", async (req,res)=>{

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        specialization,
        password
    } = req.body;

    const { data,error } =
    await supabase
    .from("doctors")
    .update({
        name,
        email,
        phone,
        specialization,
        password
    })
    .eq("id",id);

    res.json({
        success:true,
        message:"Profile Updated"
    });

});

router.put(
"/doctor-availability/:id",
async (req,res)=>{

    const { id } =
    req.params;

    const { availability } =
    req.body;

    const { error } =
    await supabase
    .from("doctors")
    .update({
        availability
    })
    .eq("id",id);

    if(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }

    res.json({
        success:true,
        message:"Availability Updated"
    });

});

router.put(
"/update-consulted/:id",
async (req,res)=>{

    try{

        const { id } = req.params;

        const { error } =
        await supabase
.from("appointments")
.update({
    consulted: true
})
.eq("id", id);

        if(error){

            return res.status(400).json({
                success:false,
                message:error.message
            });

        }

        res.json({
            success:true,
            message:"Consultation Completed"
        });

    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});

// ================= FORGOT PASSWORD =================

router.put("/forgot-password", async (req, res) => {

    try {

        const {
            email,
            role,
            newPassword
        } = req.body;

        let table = "";

        if(role === "patient"){
            table = "patients";
        }
        else if(role === "doctor"){
            table = "doctors";
        }
        else if(role === "admin"){
            table = "admins";
        }
        else{

            return res.status(400).json({
                success:false,
                message:"Invalid Role"
            });

        }

        // Check email exists

        const { data, error } =
        await supabase
        .from(table)
        .select("*")
        .eq("email", email)
        .single();

        if(error || !data){

            return res.status(404).json({
                success:false,
                message:"Email not found"
            });

        }

        // Update Password

        const { error:updateError } =
        await supabase
        .from(table)
        .update({
            password:newPassword
        })
        .eq("email", email);

        if(updateError){

            return res.status(400).json({
                success:false,
                message:updateError.message
            });

        }

        res.json({

            success:true,
            message:"Password Updated Successfully"

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

});
module.exports = router;